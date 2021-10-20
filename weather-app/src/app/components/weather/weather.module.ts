import {NgModule} from "@angular/core";

import {WeatherComponent} from "./weather.component";
import {HeaderComponent} from "../header/header.component";
import {FindWeatherComponent} from "../find-weather/find-weather.component";
import {MainWidgetComponent} from "../main-widget/main-widget.component";
import {WidgetComponent} from "../widget/widget.component";

@NgModule({
  declarations: [
    WeatherComponent,
    HeaderComponent,
    FindWeatherComponent,
    MainWidgetComponent,
    WidgetComponent
  ],
  imports: [],
  exports: [WeatherComponent],
})
export class WeatherModule {}
