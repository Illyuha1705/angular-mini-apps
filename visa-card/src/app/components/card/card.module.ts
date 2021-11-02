import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NumbersOnly } from '../../directives/card-number.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        CardComponent,
        NumbersOnly,
    ],
    imports: [ReactiveFormsModule, CommonModule],
    providers: [],
    exports: [CardComponent]
})
export class CardModule {}