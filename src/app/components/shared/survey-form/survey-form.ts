import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Button } from '../button/button';
import { AddQuestion } from '../add-question/add-question';
import { Trashcan } from '../trashcan/trashcan';

@Component({
  selector: 'survey-form',
  imports: [ReactiveFormsModule, Button, AddQuestion, Trashcan],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.scss',
})
export class SurveyForm {
  surveyForm = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(new Date(2023, 4, 11)),
    describing: new FormControl('')
  });

  onSubmit() {
    console.log(this.surveyForm.value);
  }
}
