import { NgModule } from '@angular/core';
import { CustomCheckboxComponent } from '../custom-checkbox/custom-checkbox.component';
import { ButtonComponent } from '../button/button.component';
import { CardBackPartComponent } from '../card-back-part/card-back-part.component';
import { CardFrontPartComponent } from '../card-front-part/card-front-part.component';
import { CardComponent } from './card.component';

@NgModule({
    declarations: [CardComponent, CustomCheckboxComponent, ButtonComponent, CardBackPartComponent, CardFrontPartComponent,],
    imports: [],
    providers: [],
    exports: [CardComponent]
})
export class CardModule {}