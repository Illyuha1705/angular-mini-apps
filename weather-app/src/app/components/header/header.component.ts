import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../../services/data-storage.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  weatherData: any;

  currentWeather = '';
  currentWeatherText = '';
  currentWeatherImage = '';

  private destroy$: Subject<void> = new Subject();

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.weatherDataChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedWeatherData: any) => {
          this.weatherData = updatedWeatherData;
          this.retrieveWeatherData();
        }
      });
  }

  public retrieveWeatherData(): void {
    this.currentWeather = this.weatherData.current.temp_c;
    this.currentWeatherText = this.weatherData.current.condition.text;
    this.currentWeatherImage = this.weatherData.current.condition.icon;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
