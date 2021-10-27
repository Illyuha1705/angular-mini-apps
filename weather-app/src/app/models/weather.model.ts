import { LocationModel } from './location.model';
import { CurrentModel } from './current.model';
import { ForecastDayModel } from './forecast-day.model';

export class WeatherModel {
    constructor(
        public location: LocationModel,
        public current: CurrentModel,
        public forecast: {
            forecastday: ForecastDayModel[],
        }) {
    }
}
