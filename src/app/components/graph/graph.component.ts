import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as _ from 'lodash';
import { preparePlotFunction } from '../../../utilities/prepare-plot-function';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

    formulaFn: (x: number) => number;
    data: any;
    chart: any;
    @ViewChild('lineChart') private chartRef;

    constructor() {
    }

    @Input('formula') set setFormula(value: { 'formula': string, 'range': { 'a': string, 'b': string } }) {
        if (!!value) {
            this.formulaFn = preparePlotFunction(value.formula);
            this._setChartData();
            this._registerChartPlugin();
            this._buildChart();
        }
    }

    @Input() range: { a: number, b: number };
    @Input() elipson: number;

    ngOnInit() {
        this.chart = new Chart(this.chartRef.nativeElement, {type: 'line'});
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

    private _buildChart(): void {
        this.chart = new Chart(this.chartRef.nativeElement, {
            type: 'line',
            data: this.data,
            options: {
                elements: {point: {hitRadius: 10, hoverRadius: 5, radius: 0}},
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }],
                }
            }
        });
    }

    private _setChartData() {
        const range = _.range(this.range.a, this.range.b, 1)
        this.data = {
            labels: range,
            datasets: [{
                label: 'f(x) = x', // Name it as you want
                function: this.formulaFn,
                data: [], // Don't forget to add an empty data array, or else it will break
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        };
    }
}
