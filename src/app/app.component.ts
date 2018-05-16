import { Component, OnInit } from '@angular/core';
import { RequestedAPIService } from './services/requested-api/requested-api.service';
import { RequestedAPI } from './services/requested-api/requested-api';
import { RequestedAPIBusiness } from './domains/requested-api/business/requested-api.business';
import { GroupAPI } from './services/requested-api/group-api.';

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
        let groupIds = this.getGroupIds();
        this.groups = this.getGroups(groupIds);
        console.log(this.groups);
      })
      .catch(error => {
        console.error(error);
      })
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
      return 'OK'
    } else {
      return 'FAIL';
    }
  }

  getStatusClass(api: RequestedAPI): string {
    if (api.status == null) {
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
    return this.apis.map(e =>  e['groupId']).filter((e, i, a) => i === a.indexOf(e));
  }

  private getGroups(groupIds: string[]): GroupAPI[] {
    let groups: GroupAPI[] = [];
    groupIds.forEach(id => {
      let list = this.apis.filter(api => api.groupId === id);
      let group = new GroupAPI(list);
      groups.push(group);
    });
    return groups;
  }
}
