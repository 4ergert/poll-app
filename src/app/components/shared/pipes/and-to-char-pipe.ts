import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'andMark'
})
// replaces "And" in the string with "&" 
export class AndMarkPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/And/g, ' & ');
  }
}