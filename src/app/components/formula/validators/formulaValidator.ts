import { AbstractControl } from '@angular/forms';

export function FormulaValidator(control: AbstractControl) {
    const formula: string = control.value;
    return /^[x^+-\s0-9]*$/.test(formula)
        ? null
        : {invalidFormula: true};
}

