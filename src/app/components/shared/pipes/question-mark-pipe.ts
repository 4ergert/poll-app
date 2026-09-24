import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionMark'
})
/** Ensures displayed question text ends with a question mark. */
export class QuestionMarkPipe implements PipeTransform {
  /** Appends a question mark only when the value does not already have one. */
  transform(question: string): string {
    return question.endsWith('?') ? question : `${question}?`;
  }
}