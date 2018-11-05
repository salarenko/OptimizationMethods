import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormulaValidator } from './validators/formulaValidator';
import { RangeValidator } from './validators/rangeValidator';

@Component({
    selector: 'app-formula',
    templateUrl: './formula.component.html',
    styleUrls: ['./formula.component.scss']
})
export class FormulaComponent implements OnInit {

    public formulaForm: FormGroup;

    @Output() formula = new EventEmitter();

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this._buildForm();
    }

    public emitFormula() {
        if (this.formulaForm.valid) {
            this.formula.emit(this.formulaForm.getRawValue());
        } else {
            this.formulaForm.get('formula').markAsTouched();
            this.formulaForm.get('range.b').markAsTouched();
            this.formulaForm.get('range.a').markAsTouched();
            this.formulaForm.get('range.epsilon').markAsTouched();
        }
    }

    private _buildForm() {
        this.formulaForm = this.fb.group({
                'formula': ['', [Validators.required, FormulaValidator]],
                'range': this.fb.group({
                    'a': ['', [Validators.required]],
                    'b': ['', [Validators.required]],
                    'epsilon': [0.001, [Validators.required]]
                }, {
                    validator: RangeValidator
                }),
            }
        );
    }

}
