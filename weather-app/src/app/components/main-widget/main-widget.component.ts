import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService }           from '../../services/data-storage.service';
import { takeUntil }                    from 'rxjs/operators';
import { Subject }                      from 'rxjs';
import { WidgetModel }                  from '../../models/widget.model';

@Component({
  selector: 'app-main-widget',
  templateUrl: './main-widget.component.html',
  styleUrls: ['./main-widget.component.scss']
})
export class MainWidgetComponent implements OnInit, OnDestroy {
  weatherData: any;
  widgets: WidgetModel[] = [];
  currentCity = '';
  activeWidget = 0;

  private destroy$: Subject<void> = new Subject();

  constructor(private dataStorageService: DataStorageService) {
  }

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
    this.resetActiveWidgetAndWidgets();
    this.currentCity = `${this.weatherData?.location.name}, ${this.weatherData?.location.country}`;

    this.weatherData.forecast.forecastday.forEach(day => {
      this.widgets.push(
        new WidgetModel(
          day.date,
          day.day.condition.icon,
          day.day.condition.text,
          day.day.mintemp_c,
          day.day.maxtemp_c
        )
      );
    });
  }

  public chooseActiveWidget(index: number): void {
    this.dataStorageService.setGeneralInfoIndex = index;
    this.activeWidget = index;
  }

  public resetActiveWidgetAndWidgets(): void {
    this.activeWidget = 0;
    this.widgets = [];
    this.chooseActiveWidget(0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
