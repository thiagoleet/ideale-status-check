import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
    declarations: [ChartComponent],
    imports: [CommonModule, ChartsModule],
    exports: [ChartComponent],
    providers: [],
})
export class ChartModule { }