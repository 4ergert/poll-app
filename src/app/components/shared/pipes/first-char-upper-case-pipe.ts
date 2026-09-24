import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstCharUpperCase'
})
/** Capitalizes the first character of a string without changing the remainder. */
export class FirstCharUpperCasePipe implements PipeTransform {
  /** Returns the value with its first character converted to uppercase. */
  transform(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}