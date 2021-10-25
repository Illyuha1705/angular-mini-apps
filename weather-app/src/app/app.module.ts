import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { WeatherModule } from './components/weather/weather.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    WeatherModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
