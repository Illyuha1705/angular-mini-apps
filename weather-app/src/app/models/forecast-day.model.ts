import { DayModel } from './day.model';

export class ForecastDayModel {
    constructor(
        public date: string,
        public day: DayModel,
        public hour: {
            temp_c: string,
            time: string,
        }[]
    ) {
    }
}