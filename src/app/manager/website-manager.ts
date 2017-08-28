import { Injectable } from "@angular/core";
import { Website } from "app/models/website";

@Injectable()
export class WebsiteManager{
    
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
}