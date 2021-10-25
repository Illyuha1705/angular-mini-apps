export class WidgetGeneralInfoModel {
  public humidity: string;
  public chanceOfRain: string;
  public maxWindSpeed: string;
  public visKm: string;

  constructor(humidity: string, chanceOfRain: string, maxWindSpeed: string, visKm: string) {
    this.humidity = humidity;
    this.chanceOfRain = chanceOfRain;
    this.maxWindSpeed = maxWindSpeed;
    this.visKm = visKm;
  }
}
