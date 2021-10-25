export class WidgetGeneralInfoModel {
  public humidity: string;
  public chanceOfRain: string;
  public maxWindSpeed: string;
  public visKm: string;
  public maxTemp: string;
  public minTemp: string;
  public weatherText: string;

  constructor(humidity: string, chanceOfRain: string, maxWindSpeed: string, visKm: string,
              maxTemp: string, minTemp: string, weatherText: string) {
    this.humidity = humidity;
    this.chanceOfRain = chanceOfRain;
    this.maxWindSpeed = maxWindSpeed;
    this.visKm = visKm;
    this.maxTemp = maxTemp;
    this.minTemp  = minTemp;
    this.weatherText = weatherText;
  }
}
