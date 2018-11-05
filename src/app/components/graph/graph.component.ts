import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import 'chartjs-plugin-zoom';
import * as _ from 'lodash';
import {ICompleteData} from '../../models/complete-data.interface';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

    stepByStep: { a, b }[];
    initialRange: { a, b };
    formulaFn: (x: number) => number;
    data;
    chart;
    stepNum = 1;
    result;
    epsilon;

    @ViewChild('lineChart') private chartRef;

    constructor() {
    }

    @Input('completeData') set initializeComponentDatasets(value: ICompleteData) {
        if (!!value) {
            this.stepNum = 1;
            this.formulaFn = value.fn;
            this.stepByStep = value.stepByStepSolution;
            this.initialRange = {a: value.a, b: value.b};
            this.result = value.zeroPoint;
            this.epsilon = value.epsilon;
            this._setChartData(value.a, value.b);
            this._registerChartPlugin();
            this._buildChart();
        }
    }

    @Output() currentStep = new EventEmitter();

    ngOnInit() {
        this.chart = new Chart(this.chartRef.nativeElement, {type: 'line'});
    }

    public incrementStep() {
        if (this.stepNum < this.stepByStep.length) {
            this.stepNum++;
            this.currentStep.emit(this.stepNum);
            this._updateDataSet();
        }
    }

    public decrementStep() {
        if (this.stepNum > 1) {
            this.stepNum--;
            this.currentStep.emit(this.stepNum);
            this._updateDataSet();
        }
    }

    private _updateDataSet() {
        this.chart.data.datasets.pop();

        this.pushStepAndReload(
            this.stepByStep[this.stepNum - 1].a,
            this.stepByStep[this.stepNum - 1].b,
            'rgba(99, 1, 132, 1)',
            'rgba(99, 1, 132, .2)'
        );
    }

    private _registerChartPlugin(): void {
        Chart.pluginService.register({
            beforeInit: function (chart) {
                // We get the chart data
                const data: any = chart.config.data;

                for (let i = 0; i < data.datasets.length; i++) {

                    // For every label ...
                    for (let j = 0; j < data.labels.length; j++) {

                        // We get the dataset's function and calculate the value
                        const fct = data.datasets[i].function,
                            x = data.labels[j],
                            y = fct(x);
                        // Then we add the value to the dataset data
                        data.datasets[i].data.push(y);
                    }
                }
            }
        });
    }

    private pushStepAndReload(a, b, color, background, lineWidth?) {

        this.chart.data.datasets.push({
            data: [{
                x: Math.round(a * 10) / 10,
                y: this.formulaFn(a)
            }, {
                x: Math.round(b * 10) / 10,
                y: this.formulaFn(b)
            }],
            label: 'Search range',
            backgroundColor: background,
            borderColor: color,
            borderWidth: 1,
            lineWidth: lineWidth || 1
        });

        this.chart.update();
    }

    private _buildChart(): void {
        this.chart = new Chart(this.chartRef.nativeElement, {
            type: 'line',
            data: this.data,
            options: {
                elements: {point: {hitRadius: 10, hoverRadius: 5, radius: 0}},
                legend: {
                    // display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                // Container for pan options
                pan: {
                    // Boolean to enable panning
                    enabled: true,

                    // Panning directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow panning in the y direction
                    mode: 'xy'
                },

                // Container for zoom options
                zoom: {
                    // Boolean to enable zooming
                    enabled: true,

                    // Zooming directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow zooming in the y direction
                    mode: 'xy',
                }
            },
        });

        this.pushStepAndReload(this.result, this.result, 'rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, .2)');
        this.pushStepAndReload(this.initialRange.a, this.initialRange.b, 'rgba(99, 1, 132, 1)', 'rgba(99, 1, 132, .2)');
    }

    private _setChartData(a, b) {

        const range = _.range(a + .5 * a, b + .5 * b + .1, .1).map(val => Math.round(val * 10) / 10);

        this.data = {
            labels: range,
            datasets: [{
                label: 'F(x)',
                function: this.formulaFn,
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        };
    }
}
