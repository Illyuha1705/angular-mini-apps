export class WidgetModel {
    public image: string;
    public weatherText: string;
    public minTemperature: string;
    public maxTemperature: string;

    constructor(public date: string, image: string, weatherText: string, minTemperature: string, maxTemperature: string) {
        this.image = image;
        this.weatherText = weatherText;
        this.minTemperature = minTemperature;
        this.maxTemperature = maxTemperature;
    }
}
