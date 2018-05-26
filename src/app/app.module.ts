import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'rxjs/Rx';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestedAPIBusiness } from './domains/requested-api/business/requested-api.business';
import { RequestedAPIService } from './domains/requested-api/services/requested-api.service';
import { ChartModule } from './components/chart/chart.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [
    RequestedAPIService,
    RequestedAPIBusiness
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
