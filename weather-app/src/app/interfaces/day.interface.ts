export interface DayInterface {
    avghumidity: string,
    daily_chance_of_rain: string,
    maxwind_kph: string,
    avgvis_km: string,
    maxtemp_c: string,
    mintemp_c: string,
    condition: {
        text: string,
        icon: string,
    }
}