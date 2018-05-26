import { Component, OnInit } from '@angular/core';
import { RequestedAPIBusiness } from './domains/requested-api/business/requested-api.business';
import { RequestedAPI } from './domains/requested-api/models/requested-api';
import { GroupAPI } from './domains/requested-api/models/group-api.';
import { RequestedAPIService } from './domains/requested-api/services/requested-api.service';
import fontawesome from '@fortawesome/fontawesome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  apis: RequestedAPI[] = [];
  groups: GroupAPI[] = [];
  group: GroupAPI = null;
  chart = [];

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

  selectGroup(event: any, group: GroupAPI): void {
    if (event) {
      event.preventDefault();
    }
    this.group = group;
  }

  selectedGroup(): GroupAPI {
    return this.group || new GroupAPI(this.apis);
  }

  environmentTitle(): string {
    return (this.group) ? `${this.group.environment.label} ${this.group.type.label}` : 'All environments';
  }

  allApis(): RequestedAPI[] {
    let apis: RequestedAPI[] = [];
    this.groups.forEach(group => apis.push(...group.apis));
    return apis;
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

  getHealthBadge(percentage: number): string {
    if (!percentage) {
      return 'badge-secondary';
    } else if (percentage == 100) {
      return 'badge-success';
    } else if (percentage > 100 && percentage < 70) {
      return 'badge-warning';
    } else {
      return 'badge-danger';
    }
  }

  getStatusClass(api: RequestedAPI): string {
    if (!api || api.status == null) {
      return 'badge-secondary';
    } else if (api.status) {
      return 'badge-success'
    } else {
      return 'badge-danger';
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
