import {Component, Input, OnInit} from '@angular/core';
import {ICompleteData} from '../../models/complete-data.interface';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

    constructor() {
    }

    stepByStep;

    @Input('completeData') set initializeComponentDatasets(value: ICompleteData) {
        if (!!value) {
            this.stepByStep = value.stepByStepSolution;
        }
    }
    @Input() currentStep;

    ngOnInit() {
    }

}
