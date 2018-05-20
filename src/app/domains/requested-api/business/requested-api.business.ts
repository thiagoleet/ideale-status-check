import { Injectable } from '@angular/core';
import { RequestedAPI } from '../models/requested-api';

@Injectable()
export class RequestedAPIBusiness {
    totalApis(apis: RequestedAPI[]): number {
        return apis.length;
    }

    liveApis(apis: RequestedAPI[]): number {
        return apis.filter(a => a.status === true).length;
    }

    deadApis(apis: RequestedAPI[]): number {
        return apis.filter(a => a.status === false).length;
    }

    waitingApis(apis: RequestedAPI[]): number {
        return apis.filter(a => a.status == null).length;
    }

    calcHealth(apis: RequestedAPI[]): number {
        const total = this.totalApis(apis);
        const live = this.liveApis(apis);
        return this.calcPercentage(live, total);
    }

    getHealth(apis: RequestedAPI[]): string {
        return `${this.calcHealth(apis).toFixed(1)}%`;
    }

    getWaiting(apis: RequestedAPI[]): string {
        const total = this.totalApis(apis);
        const waiting = this.waitingApis(apis);
        return this.getPercentage(waiting, total);
    }

    getDead(apis: RequestedAPI[]): string {
        const total = this.totalApis(apis);
        const dead = this.deadApis(apis);
        return this.getPercentage(dead, total);
    }

    calcPercentage(list: number, total: number): number {
        return (list / total) * 100;
    }

    getPercentage(list: number, total: number): string {
        const percent = this.calcPercentage(list, total);
        return `${percent.toFixed(1)}%`;
    }

}
