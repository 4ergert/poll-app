import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from '../../shared/button/button';
import { AddQuestion, QuestionForm } from '../add-question/add-question';
import { Trashcan } from '../../shared/trashcan/trashcan';
import { SecButton } from '../../shared/sec-button/sec-button';
import { Survices } from '../../shared/services/survices';
import { SurveyModel } from '../../shared/models/surveymodel';
import { SURVEY_CATEGORIES } from '../../shared/utils/survey-categories';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'survey-form',
  imports: [ReactiveFormsModule, Button, AddQuestion, Trashcan, SecButton],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
/** Manages survey creation, validation, persistence, and confirmation feedback. */
export class SurveyForm implements OnDestroy {
  readonly categories = SURVEY_CATEGORIES;
  readonly isPublishConfirmationVisible = signal(false);
  readonly minimumEndDate = this.getDateInputValue(new Date());
  surveyForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      date: new FormControl<string | null>(null),
      category: new FormControl('', Validators.required),
      describing: new FormControl(''),
      questions: new FormArray([this.createQuestionForm()]),
    }
  );
  readonly questions = this.surveyForm.controls.questions;
  surveyService: Survices = inject(Survices);
  private readonly dialogService = inject(DialogService);
  private readonly router = inject(Router);
  private publishConfirmationTimeout?: ReturnType<typeof setTimeout>;

  /** Validates and persists the survey, then resets the form after success. */
  async onSubmit() {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    const value = this.surveyForm.getRawValue();
    const surveyData = new SurveyModel({
      name: value.name ?? '',
      date: this.getEndDate(value.date),
      category: value.category ?? '',
      describing: value.describing ?? '',
      questions: value.questions.map((question) => ({
        question: question.question ?? '',
        multipleChoice: question.multipleChoice ?? false,
        answers: question.answers.map((answer) => answer ?? ''),
      })),
    });

    const savedSurvey = await this.surveyService.saveSurvey(surveyData);

    if (savedSurvey.id === undefined) {
      throw new Error('Saved survey is missing an ID.');
    }

    this.isPublishConfirmationVisible.set(true);
    this.publishConfirmationTimeout = setTimeout(() => {
      this.dialogService.closeCreateSurveyDialog();
      void this.router.navigate(['/vote', savedSurvey.id]);
    }, 3_000);
  }

  ngOnDestroy() {
    if (this.publishConfirmationTimeout) {
      clearTimeout(this.publishConfirmationTimeout);
    }
  }

  /** Appends a new question with two required answer fields. */
  addQuestion() {
    this.questions.push(this.createQuestionForm());
  }

  private createQuestionForm(): QuestionForm {
    return new FormGroup({
      question: new FormControl('', Validators.required),
      multipleChoice: new FormControl(false),
      answers: new FormArray([
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
      ]),
    });
  }

  /** Resets a supported top-level survey field to its initial value. */
  delete(field: string) {
    switch (field) {
      case 'name':
        this.surveyForm.controls.name.reset('');
        break;
      case 'date':
        this.surveyForm.controls.date.reset(null);
        break;
      case 'describing':
        this.surveyForm.controls.describing.reset('');
        break;
      default:
        break;
    }
  }

  /** Returns the selected end date or one calendar year from today when none is supplied. */
  private getEndDate(date: string | null): Date {
    if (date) {
      const endDate = new Date(`${date}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (endDate < today) {
        throw new Error('The survey end date cannot be in the past.');
      }

      return endDate;
    }

    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);
    return endDate;
  }

  private getDateInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
