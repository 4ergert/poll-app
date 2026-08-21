import { Component } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Button } from '../button/button';
import { AddQuestion, QuestionForm } from '../add-question/add-question';
import { Trashcan } from '../trashcan/trashcan';
import { SecButton } from '../sec-button/sec-button';

@Component({
  selector: 'survey-form',
  imports: [ReactiveFormsModule, Button, AddQuestion, Trashcan, SecButton],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {
  surveyForm = new FormGroup(
    {
      name: new FormControl(''),
      date: new FormControl(new Date(2023, 4, 11)),
      category: new FormControl(''),
      describing: new FormControl(''),
      questions: new FormArray([this.createQuestionForm()]),
    }
  );
  readonly questions = this.surveyForm.controls.questions;

  onSubmit() {
    console.log(this.surveyForm.value);
    this.surveyForm.controls.name.reset('');
    this.surveyForm.controls.date.reset(new Date(2023, 4, 11));
    this.surveyForm.controls.describing.reset('');
    this.questions.clear();
    this.questions.push(this.createQuestionForm());
    this.surveyForm.markAsPristine();
    this.surveyForm.markAsUntouched();
  }

  addQuestion() {
    this.questions.push(this.createQuestionForm());
  }

  private createQuestionForm(): QuestionForm {
    return new FormGroup({
      question: new FormControl(''),
      multipleChoice: new FormControl(false),
      answers: new FormArray([
        new FormControl(''),
        new FormControl(''),
      ]),
    });
  }
}
