import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Rejects selected calendar dates before today while allowing an empty optional date. */
export const notPastDate: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }

  const selectedDate = new Date(`${control.value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selectedDate < today ? { pastDate: true } : null;
};
