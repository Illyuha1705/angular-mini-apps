import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    cardForm: FormGroup;
    saveCardData = localStorage.getItem('isSaved') || false;

    ngOnInit(): void {
        this.initForm();
    }

    sentForm(): void {
        console.log(this.cardForm.value);
        this.sentCardDataToLs();
    }

    private initForm(): void {
        const cardNumber = JSON.parse(localStorage.getItem('card-data')) || null;
        this.cardForm = new FormGroup({
             'cardNumber': new FormControl( cardNumber?.cardNumber || '', [Validators.required, Validators.minLength(19)]),
             'cardMonth': new FormControl(cardNumber?.cardMonth || '', [Validators.required, Validators.maxLength(2)]),
             'cardYear': new FormControl(cardNumber?.cardYear || '', [Validators.required, Validators.maxLength(2)]),
            'cardCvv': new FormControl(cardNumber?.cardCvv || '', [Validators.required]),
        });
    }

    toggleSaveCardData(): void {
        this.saveCardData = !this.saveCardData;
    }

    sentCardDataToLs(): void {
        if (this.saveCardData) {
            localStorage.setItem('card-data', JSON.stringify(this.cardForm.value));
            localStorage.setItem('isSaved', 'true');
        } else {
            localStorage.clear();
            this.cardForm.reset();
        }
    }
}
