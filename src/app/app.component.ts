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
  apis: RequestedAPI[] = [];
  groups: GroupAPI[] = [];
  group: GroupAPI = null;

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

  handleGroupUpdated(group: GroupAPI): void {
    console.log(group);
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
}
