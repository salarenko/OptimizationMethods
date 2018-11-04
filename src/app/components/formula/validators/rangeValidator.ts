import {AbstractControl} from '@angular/forms';

export function RangeValidator(control: AbstractControl) {
  if (control.root.get('range.a') && control.root.get('range.b') && control.root.get('range.a').value >= control.root.get('range.b').value) {
    return {rangeError: true};
  }
  return null;
}

