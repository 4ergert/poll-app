import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Button } from '../../shared/button/button';
import { AddQuestion, QuestionForm } from '../add-question/add-question';
import { Trashcan } from '../../shared/trashcan/trashcan';
import { SecButton } from '../../shared/sec-button/sec-button';
import { Survices } from '../../shared/services/survices';
import { SurveyModel } from '../../shared/models/surveymodel';
import { SURVEY_CATEGORIES } from '../../shared/utils/survey-categories';

@Component({
  selector: 'survey-form',
  imports: [ReactiveFormsModule, Button, AddQuestion, Trashcan, SecButton],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm implements OnDestroy {
  readonly categories = SURVEY_CATEGORIES;
  readonly isPublishConfirmationVisible = signal(false);
  surveyForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      date: new FormControl(new Date(2023, 4, 11)),
      category: new FormControl('', Validators.required),
      describing: new FormControl(''),
      questions: new FormArray([this.createQuestionForm()]),
    }
  );
  readonly questions = this.surveyForm.controls.questions;
  surveyService: Survices = inject(Survices);
  private publishConfirmationTimeout?: ReturnType<typeof setTimeout>;

  async onSubmit() {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    const value = this.surveyForm.getRawValue();
    const surveyData = new SurveyModel({
      name: value.name ?? '',
      date: value.date ?? new Date(2023, 4, 11),
      category: value.category ?? '',
      describing: value.describing ?? '',
      questions: value.questions.map((question) => ({
        question: question.question ?? '',
        multipleChoice: question.multipleChoice ?? false,
        answers: question.answers.map((answer) => answer ?? ''),
      })),
    });

    await this.surveyService.saveSurvey(surveyData);
    this.showPublishConfirmation();

    this.surveyForm.controls.name.reset('');
    this.surveyForm.controls.date.reset(new Date(2023, 4, 11));
    this.surveyForm.controls.describing.reset('');
    this.questions.clear();
    this.questions.push(this.createQuestionForm());
    this.surveyForm.markAsPristine();
    this.surveyForm.markAsUntouched();
  }

  ngOnDestroy() {
    if (this.publishConfirmationTimeout) {
      clearTimeout(this.publishConfirmationTimeout);
    }
  }

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

  delete(field: string) {
    switch (field) {
      case 'name':
        this.surveyForm.controls.name.reset('');
        break;
      case 'date':
        this.surveyForm.controls.date.reset(new Date(2023, 4, 11));
        break;
      case 'describing':
        this.surveyForm.controls.describing.reset('');
        break;
      default:
        break;
    }
  }

  private showPublishConfirmation() {
    if (this.publishConfirmationTimeout) {
      clearTimeout(this.publishConfirmationTimeout);
    }

    this.isPublishConfirmationVisible.set(true);
    this.publishConfirmationTimeout = setTimeout(() => {
      this.isPublishConfirmationVisible.set(false);
      this.publishConfirmationTimeout = undefined;
    }, 4_000);
  }
}
