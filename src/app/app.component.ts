import { Component, OnInit } from '@angular/core';
import { RequestedAPIBusiness } from './domains/requested-api/business/requested-api.business';
import { RequestedAPI } from './domains/requested-api/models/requested-api';
import { GroupAPI } from './domains/requested-api/models/group-api.';
import { RequestedAPIService } from './domains/requested-api/services/requested-api.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  apis: RequestedAPI[] = [];
  groups: GroupAPI[] = [];

  constructor(private myService: RequestedAPIService, private myBusiness: RequestedAPIBusiness) { }

  ngOnInit(): void {
    this.getAll()
      .then(apis => {
        this.apis = apis;
        const groupIds = this.getGroupIds();
        const groups = this.getGroups(groupIds);
        return groups;
      })
      .then(groups => {
        this.groups = groups;
        this.groups.forEach(group => {
          this.check(group.apis);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  check(apis: RequestedAPI[]): void {
    apis.forEach(api => {
      this.checkStatus(api)
        .then(response => api.status = response)
        .catch(error => api.status = error);
    });
  }

  getStatus(api: RequestedAPI): string {
    if (api.status == null) {
      return 'Processing';
    } else if (api.status) {
      return 'OK';
    } else {
      return 'FAIL';
    }
  }

  getStatusClass(api: RequestedAPI): string {
    if (api.status == null) {
      return 'bg-light';
    } else if (api.status) {
      return 'bg-success';
    } else {
      return 'bg-danger';
    }
  }

  private getAll(): Promise<RequestedAPI[]> {
    return new Promise((resolve, reject) => {
      this.myService.getAll().subscribe(apis => resolve(apis), error => reject(error));
    });
  }

  private checkStatus(api: RequestedAPI): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.myService.head(api.url).subscribe(() => resolve(true), error => reject(false));
    });
  }

  private getGroupIds(): string[] {
    return this.apis.map(e => e['groupId']).filter((e, i, a) => i === a.indexOf(e));
  }

  private getGroups(groupIds: string[]): GroupAPI[] {
    const groups: GroupAPI[] = [];
    groupIds.forEach(id => {
      const list = this.apis.filter(api => api.groupId === id);
      const group = new GroupAPI(list);
      groups.push(group);
    });
    return groups;
  }

  // getChart(group: GroupAPI): Chart {
  //   const ctx = document.querySelector(`#canvas_${group.groupId}`).getContext('2d');
  //   const config = {
  //     type: 'doughnut',
  //     data: {
  //       labels: ['Waiting', 'Online', 'Offline'],
  //       datasets: [{
  //         data: [this.myBusiness.waitingApis(group.apis), this.myBusiness.liveApis(group.apis), this.myBusiness.deadApis(group.apis)]
  //       }]
  //     }
  //   };
  //   const chart = new Chart(ctx, config);
  //   console.log(chart);
  //   return chart;
  // }
}
