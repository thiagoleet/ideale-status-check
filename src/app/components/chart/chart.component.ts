import { Component, OnInit, OnChanges, SimpleChanges, Input, AfterViewInit } from '@angular/core';
import { RequestedAPI } from '../../domains/requested-api/models/requested-api';
import { RequestedAPIBusiness } from '../../domains/requested-api/business/requested-api.business';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit, OnChanges {
    @Input() apis: RequestedAPI[] = [];
    doughnutChartLabels: string[] = ['Online', 'Offline', 'Awaiting'];
    doughnutChartData: number[] = [0, 0, 0];
    doughnutChartType: string = 'doughnut';
    colors: any[] = [{ backgroundColor: ['green', 'red', 'blue'] }];

    constructor(private myBusiness: RequestedAPIBusiness) { }

    ngOnInit(): void { }

    ngAfterViewInit() { }

    ngOnChanges(changes: SimpleChanges): void { }

    getData(): number[] {
        let alive = this.myBusiness.liveApis(this.apis);
        let dead = this.myBusiness.deadApis(this.apis);
        let awaiting = this.myBusiness.waitingApis(this.apis);
        return [alive, dead, awaiting];
    }

}
