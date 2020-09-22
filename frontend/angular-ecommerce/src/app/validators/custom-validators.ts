import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  // not only whitespace validation
  static notOnlyWhitespace(formControl: FormControl): ValidationErrors {
    // check if the input from users only contain whitespace
    if ((formControl.value != null) && (formControl.value.trim().length === 0)) {
      return { 'onlyWhitespace': true };
    }
    else {
      return null;
    }    
  }
}