import { Component, OnInit, Input } from '@angular/core';
import { Website } from "app/models/website";

@Component({
    moduleId: module.id,
    selector: 'panel-status',
    templateUrl: './panel.component.html',
})
export class PanelComponent implements OnInit {
    @Input() endpoints: Website[] = [];
    @Input() title: string;
    
    constructor() { }

    ngOnInit() { }

    totalApis(apis: Website[]): number{
        return apis.length;
    }

    liveApis(apis: Website[]): number{
        return apis.filter(a => a.status == true).length;
    }

    deadApis(apis: Website[]): number{
        return apis.filter(a => a.status == false).length;
    }

    waitingApis(apis: Website[]): number{
        return apis.filter(a => a.status == null).length;
    }

    calcHealth(apis: Website[]): number{
        let total = this.totalApis(apis);
        let live = this.liveApis(apis);
        
        return (live / total) * 100;
    }

    getHealth(apis: Website[]): string{
        return `${this.calcHealth(apis).toFixed(1)}%`;
    }

    warningClass(): string{
        if(this.calcHealth(this.endpoints) == 100 || this.waitingApis(this.endpoints) >= (this.totalApis(this.endpoints) / 2))
            return null;
        else if(this.calcHealth(this.endpoints) < 100)
            return 'yellow lighten-1';
        else if(this.calcHealth(this.endpoints) <= 90)
            return 'orange lighten-1';
        else if(this.calcHealth(this.endpoints) <= 70)
            return 'orange darken-2';
        else if(this.calcHealth(this.endpoints) <= 50)
            return 'orange darken-4';
        else
            return 'red darken-3';
        
    }
}