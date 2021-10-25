import {NgModule} from "@angular/core";

import {WeatherComponent} from "./weather.component";
import {HeaderComponent} from "../header/header.component";
import {FindWeatherComponent} from "../find-weather/find-weather.component";
import {MainWidgetComponent} from "../main-widget/main-widget.component";
import {WidgetComponent} from "../widget/widget.component";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OpenWeatherMapService } from "../../services/open-weather-map.service";
import {DataStorageService} from "../../services/data-storage.service";
import {GeneralInfoComponent} from "../general-info/general-info.component";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    WeatherComponent,
    HeaderComponent,
    FindWeatherComponent,
    MainWidgetComponent,
    WidgetComponent,
    GeneralInfoComponent,
  ],
  imports: [ReactiveFormsModule, HttpClientModule, BrowserModule],
  providers: [OpenWeatherMapService, DataStorageService],
  exports: [WeatherComponent],
})
export class WeatherModule {}
