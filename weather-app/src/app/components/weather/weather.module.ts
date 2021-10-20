import {NgModule} from "@angular/core";

import {WeatherComponent} from "./weather.component";
import {HeaderComponent} from "../header/header.component";
import {FindWeatherComponent} from "../find-weather/find-weather.component";

@NgModule({
  declarations: [
    WeatherComponent, HeaderComponent, FindWeatherComponent
  ],
  imports: [],
  exports: [WeatherComponent],
})
export class WeatherModule {}
