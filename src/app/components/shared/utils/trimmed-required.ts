import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Requires text input to contain at least one non-whitespace character. */
export const trimmedRequired: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return typeof control.value === 'string' && control.value.trim().length > 0 ? null : { required: true };
};
