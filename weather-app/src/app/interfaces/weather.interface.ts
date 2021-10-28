import { LocationInterface } from './location.interface';
import { CurrentInterface } from './current.interface';
import { ForecastDayInterface } from './forecast-day.interface';

export interface WeatherInterface {
    location: LocationInterface,
    current: CurrentInterface,
    forecast: {
        forecastday: ForecastDayInterface[],
    }
}
