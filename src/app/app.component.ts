import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Website } from "./models/website";
import { HttpClient } from "./helpers/httpclient";

declare var swal: any;
declare var toastr: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  publicEndpoints: Website[] = [];
  coreEndpoints: Website[] = [];
  sites: Website[] = [];
  stageEndpoints: Website[] = []

  constructor(private client: HttpClient){
  }

  ngOnInit() {
    this.reload(null);
  }

  ngAfterViewInit() {
    $(document).ready(function(){
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


  check(endpoints: Website[]){
    endpoints.forEach(api => {
      this.checkStatus(api)
      .then(response => api.status = response.status)
      .catch(error => {
        console.log(error);
        toastr['error'](`${api.name} Offline`);
      });
    });
  }

  checkStatus(endpoint: Website): Promise<Website>{
    return new Promise((resolve, reject) => {
      this.client.get(endpoint.url)
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
    if(event)
      event.preventDefault();

    this.getApis('assets/jsons/public.json')
    .then(apis => {
      this.publicEndpoints = apis;
      return this.check(this.publicEndpoints);
    });

    this.getApis('assets/jsons/core.json')
    .then(apis => {
      this.coreEndpoints = apis;
      return this.check(this.coreEndpoints);
    });

    this.getApis('assets/jsons/stage.json')
    .then(apis => {
      this.stageEndpoints = apis;
      return this.check(this.stageEndpoints);
    });

    // this.getApis('assets/jsons/sites.json')
    // .then(apis => {
    //   this.sites = apis;
    //   return this.check(this.sites);
    // });
  }

  getApis(path: string): Promise<Website[]>{
    return new Promise((resolve, reject) => {
      this.client.get(path)
      .map(res => res.json())
      .subscribe(response => {
        let apis: Website[] = response.map(api => new Website(api.name, api.url))
        resolve(apis);
      }, error => {
        swal(`Erro ${error.status}`, `Não foi possível ler o arquivo ${path}`, 'error');
        reject(error);
      })
    })
  }


}
