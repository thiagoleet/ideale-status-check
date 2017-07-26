import { Component, OnInit, Input } from '@angular/core';
import { Endpoint } from "app/models/endpoint";

@Component({
    moduleId: module.id,
    selector: 'panel-status',
    templateUrl: './panel.component.html',
})
export class PanelComponent implements OnInit {
    @Input() endpoints: Endpoint[] = [];
    @Input() title: string;
    
    constructor() { }

    ngOnInit() { }

    totalApis(apis: Endpoint[]): number{
        return apis.length;
    }

    liveApis(apis: Endpoint[]): number{
        return apis.filter(a => a.status == true).length;
    }

    deadApis(apis: Endpoint[]): number{
        return apis.filter(a => a.status == false).length;
    }

    waitingApis(apis: Endpoint[]): number{
        return apis.filter(a => a.status == null).length;
    }

    calcHealth(apis: Endpoint[]): number{
        let total = this.totalApis(apis);
        let live = this.liveApis(apis);
        
        return (live / total) * 100;
    }

    getHealth(apis: Endpoint[]): string{
        return `${this.calcHealth(apis).toFixed(1)}%`;
    }
}