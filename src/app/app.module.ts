import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'rxjs/Rx';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestedAPIService } from './services/requested-api/requested-api.service';
import { RequestedAPIBusiness } from './domains/requested-api/business/requested-api.business';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    RequestedAPIService,
    RequestedAPIBusiness
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
