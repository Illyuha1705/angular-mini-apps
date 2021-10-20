import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OpenWeatherMapService} from "../../services/open-weather-map.service";

@Component({
  selector: 'app-find-weather',
  templateUrl: './find-weather.component.html',
  styleUrls: ['./find-weather.component.scss']
})
export class FindWeatherComponent implements OnInit {
  weatherSearchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private openWeatherMapService: OpenWeatherMapService) {
  }

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  public sentToOpenWeatherMap(formValue: any): void {
    this.openWeatherMapService
      .getWeather(formValue.location)
      .subscribe(data => console.log(data));
  }

}
