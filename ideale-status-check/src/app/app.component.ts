import { Component, OnInit } from '@angular/core';
import { Endpoint } from "./models/endpoint";
import { AppSettings } from "./app.settings";
import { HttpClient } from "./helpers/httpclient";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  publicEndpoints: Endpoint[] = [];
  coreEndpoints: Endpoint[] = [];

  constructor(private client: HttpClient){
    this.publicEndpoints = AppSettings.getPublicEndpoints();
    this.coreEndpoints = AppSettings.getCoreEndpoints();
  }

  ngOnInit() {
    this.check(this.publicEndpoints);
    this.check(this.coreEndpoints);
  }


  check(endpoints: Endpoint[]){
    endpoints.forEach(api => {
      this.checkStatus(api)
      .then(response => api.status = response.status)
      .catch(error => {
        console.log(error);
      });
    });
  }

  getCompleteUrl(url: string): string{
    return `${url}/swagger/ui/index.html`;
  }

  checkStatus(endpoint: Endpoint): Promise<Endpoint>{
    return new Promise((resolve, reject) => {
      this.client.head(this.getCompleteUrl(endpoint.url))
      .subscribe(response => {
        endpoint.status = true;
        resolve(endpoint);
      }, error => {
        endpoint.status = false;
        reject(error);
      })
      
      
    });
  }

  reload(event){
    event.preventDefault();

    this.publicEndpoints = AppSettings.getPublicEndpoints();
    this.coreEndpoints = AppSettings.getCoreEndpoints();

    this.check(this.publicEndpoints);
    this.check(this.coreEndpoints);
  }


}
