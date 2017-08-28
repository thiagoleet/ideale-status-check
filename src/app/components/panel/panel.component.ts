import { Component, OnInit, Input } from '@angular/core';
import { Website } from "app/models/website";
import { WebsiteManager } from "app/manager/website-manager";

@Component({
    moduleId: module.id,
    selector: 'panel-status',
    templateUrl: './panel.component.html',
})
export class PanelComponent implements OnInit {
    @Input() endpoints: Website[] = [];
    @Input() title: string;
    
    constructor(private manager: WebsiteManager) { }

    ngOnInit() { }

    totalApis(apis: Website[]): number{
        return this.manager.totalApis(apis);
    }

    liveApis(apis: Website[]): number{
        return this.manager.liveApis(apis);
    }

    deadApis(apis: Website[]): number{
        return this.manager.deadApis(apis);
    }

    waitingApis(apis: Website[]): number{
        return this.manager.waitingApis(apis);
    }

    calcHealth(apis: Website[]): number{
        return this.manager.calcHealth(apis);
    }

    getHealth(apis: Website[]): string{
        return this.manager.getHealth(apis);
    }

    warningClass(): string{
        if(this.calcHealth(this.endpoints) == 100)
            return 'green';
        else if(this.waitingApis(this.endpoints) > 0)
            return null;
        else if(this.calcHealth(this.endpoints) < 100 && this.calcHealth(this.endpoints) > 90)
            return 'yellow lighten-1';
        else if(this.calcHealth(this.endpoints) <= 90 && this.calcHealth(this.endpoints) > 70)
            return 'orange lighten-1';
        else if(this.calcHealth(this.endpoints) <= 70 && this.calcHealth(this.endpoints) > 50)
            return 'orange darken-2';
        else if(this.calcHealth(this.endpoints) <= 50 && this.calcHealth(this.endpoints) > 30)
            return 'orange darken-4';
        else
            return 'red darken-3';
        
    }
}