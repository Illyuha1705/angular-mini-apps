import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class DataStorageService {
  @Output() weatherDataChanged$: EventEmitter<object> = new EventEmitter<object>();
  @Output() generalInfoIndexChanged$: EventEmitter<number> = new EventEmitter<number>();

  private weatherData: {};
  private generalInfoIndex: number;

  private updateWeatherData(): void {
    this.weatherDataChanged$.emit(this.weatherData);
  }

  private updateGeneralInfoIndex(): void {
    this.generalInfoIndexChanged$.emit(this.generalInfoIndex);
  }

  set setWeatherData(data) {
    this.weatherData = data;
    this.updateWeatherData();
  }

  set setGeneralInfoIndex(index: number) {
    this.generalInfoIndex = index;
    this.updateGeneralInfoIndex();
  }
}
