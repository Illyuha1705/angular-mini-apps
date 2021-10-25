import {Component, Input} from '@angular/core';
import {WidgetModel} from "../../models/widget.model";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {
  @Input() widget: WidgetModel;
}
