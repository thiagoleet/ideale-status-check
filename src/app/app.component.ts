import { Component, OnInit } from '@angular/core';
import { RequestedAPIService } from './domains/requested-api/requested-api.service';
import { RequestedAPI } from './domains/requested-api/requested-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  apis: RequestedAPI[] = [];

  constructor(private service: RequestedAPIService) { }

  ngOnInit(): void {
    this.getAll()
      .then(apis => {
        this.apis = apis;
        this.checkAll();
      })
      .catch(error => {
        console.error(error);
      })
  }

  checkAll() {
    this.apis.forEach(api => {
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
      this.service.getAll().subscribe(apis => resolve(apis), error => reject(error));
    });
  }

  private checkStatus(api: RequestedAPI): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.service.head(api.url).subscribe(() => resolve(true), error => reject(false));
    });
  }
}
