import { NgModule } from '@angular/core';
import { BackPartComponent } from '../back-part/back-part.component';
import { FrontPartComponent } from '../front-part/front-part.component';
import { SentComponent } from '../sent/sent.component';
import { VisaCardComponent } from './visa-card.component'
import { CustomCheckboxComponent } from '../custom-checkbox/custom-checkbox.component';

@NgModule({
    declarations: [VisaCardComponent, FrontPartComponent, BackPartComponent, CustomCheckboxComponent, SentComponent],
    imports: [],
    providers: [],
    exports: [VisaCardComponent]
})
export class VisaCardModule {}