export class DayModel {
    constructor(
        public avghumidity: string,
        public daily_chance_of_rain: string,
        public maxwind_kph: string,
        public avgvis_km: string,
        public maxtemp_c: string,
        public mintemp_c: string,
        public condition: {
            text: string,
            icon: string,
        },) {
    }
}