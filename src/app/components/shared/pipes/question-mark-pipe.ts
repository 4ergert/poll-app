import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionMark'
})
export class QuestionMarkPipe implements PipeTransform {
  transform(question: string): string {
    return question.endsWith('?') ? question : `${question}?`;
  }
}