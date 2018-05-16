import { Injectable } from "@angular/core";
import { RequestedAPI } from "../../../services/requested-api/requested-api";

@Injectable()
export class RequestedAPIBusiness {
    totalApis(apis: RequestedAPI[]): number {
        return apis.length;
    }

    liveApis(apis: RequestedAPI[]): number {
        return apis.filter(a => a.status == true).length;
    }

    deadApis(apis: RequestedAPI[]): number {
        return apis.filter(a => a.status == false).length;
    }

    waitingApis(apis: RequestedAPI[]): number {
        return apis.filter(a => a.status == null).length;
    }

    calcHealth(apis: RequestedAPI[]): number {
        let total = this.totalApis(apis);
        let live = this.liveApis(apis);

        return (live / total) * 100;
    }

    getHealth(apis: RequestedAPI[]): string {
        return `${this.calcHealth(apis).toFixed(1)}%`;
    }
}