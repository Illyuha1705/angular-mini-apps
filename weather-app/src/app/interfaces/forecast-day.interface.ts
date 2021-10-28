import { DayInterface } from './day.interface';

export interface ForecastDayInterface {
    date: string,
    day: DayInterface,
    hour: {
        temp_c: string,
        time: string,
    }[]
}