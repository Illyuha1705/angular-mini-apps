export class WidgetModel {
  public date: string;
  public image: string;
  public weatherText: string;
  public minTemperature: string;
  public maxTemperature: string;

  constructor(date: string, image: string, weatherText: string, minTemperature: string, maxTemperature: string) {
    this.date = date;
    this.image = image;
    this.weatherText = weatherText;
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
  }
}
