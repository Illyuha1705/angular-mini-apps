import { EventEmitter, Injectable, Output } from '@angular/core';
import { WeatherInterface } from '../interfaces/weather.interface';

@Injectable()
export class DataStorageService {
  @Output() weatherDataChanged$: EventEmitter<object> = new EventEmitter<object>();
  @Output() generalInfoIndexChanged$: EventEmitter<number> = new EventEmitter<number>();

  private weatherData: WeatherInterface;
  private generalInfoIndex: number;

  private updateWeatherData(): void {
    this.weatherDataChanged$.emit(this.weatherData);
  }

  private updateGeneralInfoIndex(): void {
    this.generalInfoIndexChanged$.emit(this.generalInfoIndex);
  }

  set setWeatherData(data: WeatherInterface) {
    this.weatherData = data;
    this.updateWeatherData();
  }

  set setGeneralInfoIndex(index: number) {
    this.generalInfoIndex = index;
    this.updateGeneralInfoIndex();
  }
}
