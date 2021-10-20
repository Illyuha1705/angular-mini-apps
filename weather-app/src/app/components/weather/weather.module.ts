import {NgModule} from "@angular/core";

import {WeatherComponent} from "./weather.component";

@NgModule({
  declarations: [
    WeatherComponent,
  ],
  imports: [],
  exports: [WeatherComponent],
})
export class WeatherModule {}
