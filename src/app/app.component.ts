import {Component} from '@angular/core';
import {runGoldenSectionSearch} from '../utilities/run-golden-section-search';
import {IFormula} from './models/formula.interface';
import {preparePlotFunction} from '../utilities/prepare-plot-function';
import {ICompleteData} from './models/complete-data.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    completeData: ICompleteData;
    currentStep = 1;

    public loadFormula(formula: IFormula): void {
        const fn = preparePlotFunction(formula.formula)
        const goldenSearchData = runGoldenSectionSearch(fn, formula.range.a, formula.range.b, formula.range.epsilon);
        this.completeData = {
            ...goldenSearchData,
            ...formula.range,
            fn
        };
    }
}
