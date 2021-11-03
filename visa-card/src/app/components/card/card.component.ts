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

    private initForm(): void {
        const cardNumber = JSON.parse(localStorage.getItem('card-data')) || null;
        this.cardForm = new FormGroup({
            'cardNumber': new FormControl( cardNumber?.cardNumber.substring(0, 19) || '', [Validators.required, Validators.minLength(19)]),
            'cardMonth': new FormControl(cardNumber?.cardMonth.substring(0, 2) || '', [Validators.required, Validators.minLength(2)]),
            'cardYear': new FormControl(cardNumber?.cardYear.substring(0, 2) || '', [Validators.required, Validators.minLength(2)]),
            'cardCvv': new FormControl(cardNumber?.cardCvv.substring(0, 3) || '', [Validators.required]),
        });
    }
}
