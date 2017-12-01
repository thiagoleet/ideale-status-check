import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Website } from "./models/website";
import { HttpClientHelper } from "./helpers/httpclient";
import { Enviroment } from "app/models/enviroment";
import { WebsiteManager } from "app/manager/website-manager";
import { ApiStatusEnum } from 'app/enums/api-status.enum';

declare var swal: any;
declare var toastr: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  enviroments: Enviroment[] = []

  search: string;
  filter: ApiStatusEnum = ApiStatusEnum.Todos;

  constructor(private client: HttpClientHelper, private manager: WebsiteManager) { }

  ngOnInit() {
    this.reload(null);
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('ul.tabs').tabs();
      $('select').material_select();

      toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "100",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };

    });
  }


  check(endpoints: Website[]) {
    endpoints.forEach(api => {
      this.checkStatus(api)
        .then(response => api.status = response.status)
        .catch(error => {
          console.log(error);
          toastr['error'](`${api.name} Offline`);
        });
    });
  }

  checkStatus(endpoint: Website): Promise<Website> {
    return new Promise((resolve, reject) => {
      endpoint.startRequest = new Date();
      this.client.get(endpoint.url)
        .map(res => {
          if(res.ok){
            endpoint.status = true;
            endpoint.endRequest = new Date();
            endpoint.statusCode = res.status;
            endpoint.statusText = res.statusText;
            resolve(endpoint);
          }
          else{
            endpoint.status = false;
            endpoint.endRequest = new Date();
            reject();
          }
          return res;
        })
        .subscribe(response => {
          
        }, error => {
          endpoint.status = false;
          endpoint.endRequest = new Date();
          reject(error);
        })


    });
  }

  reload(event) {
    if (event)
      event.preventDefault();

    this.getApis('assets/services/enviroments.json')
      .then(response => {
        this.enviroments = response.map(e => e = new Enviroment(e.id, e.name, e.websites));

        this.enviroments.forEach(e => {
          this.check(e.websites);
        });
      });
  }

  getApis(path: string): Promise<Enviroment[]> {
    return new Promise((resolve, reject) => {
      this.client.get(path)
        .map(res => res.json())
        .subscribe(response => {
          response.forEach(element => {
            element.websites = element.websites.map(api => new Website(api.name, api.url))
          });

          resolve(response);
        }, error => {
          swal(`Erro ${error.status}`, `Não foi possível ler o arquivo ${path}`, 'error');
          reject(error);
        })
    })
  }


  getHealthColor(websites: Website[]): string {
    if (this.manager.waitingApis(websites) > 0)
      return null
    else if (this.manager.calcHealth(websites) == 100)
      return 'green-text'
    else if (this.manager.calcHealth(websites) > 50 && this.manager.calcHealth(websites) < 100)
      return 'orange-text';
    else return 'red-text text-accent-4';
  }

  getHealthIcon(websites: Website[]): string {
    if (this.manager.waitingApis(websites) > 0)
      return 'watch_later'
    else if (this.manager.calcHealth(websites) == 100)
      return 'thumb_up'
    else if (this.manager.calcHealth(websites) > 50 && this.manager.calcHealth(websites) < 100)
      return 'warning';
    else return 'thumb_down';
  }
}
