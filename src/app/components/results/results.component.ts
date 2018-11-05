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

    @Input() completeData: ICompleteData;
    @Input() currentStep;

    ngOnInit() {
    }

}
