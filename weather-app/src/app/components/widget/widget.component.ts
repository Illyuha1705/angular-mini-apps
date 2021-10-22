import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {
  @Input() date: string;
  @Input() image: string;
  @Input() minTemperature: string;
  @Input() maxTemperature: string;
  @Input() weatherText: string;


}
