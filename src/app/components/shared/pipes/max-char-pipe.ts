import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxChar'
})
// limits the string to a maximum number of characters
export class MaxCharPipe implements PipeTransform {
  transform(value: string, maxChars: number): string {
    if (value.length > maxChars) {
      return value.substring(0, maxChars) + '...';
    }
    return value;
  }
}