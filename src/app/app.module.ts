import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'rxjs/Rx';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestedAPIService } from './domains/requested-api/requested-api.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    RequestedAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
