import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    cardForm: FormGroup;
    saveCardData: boolean = (!!localStorage.getItem('isSaved')) || false;

    ngOnInit(): void {
        this.initForm();
    }

    sentForm(): void {
        console.log(this.cardForm.value);
    }

    toggleSaveCardData(): void {
        this.saveCardData = !this.saveCardData;
    }

    transformInputValue(inputValue: string, inputLength: number): string {
        return inputValue.replace(/[^0-9]*/g, '').replace(/(.{4})/g, '$1-').substring(0, inputLength);
    }

    sentCardDataToLs(): void {
        if (this.saveCardData) {
            this.transformFormValue();
            localStorage.setItem('card-data', JSON.stringify(this.cardForm.value));
            localStorage.setItem('isSaved', 'true');
        } else {
            localStorage.clear();
            this.cardForm.reset();
        }
    }

    private transformFormValue(): void {
        this.cardForm.controls['cardNumber'].setValue(this.transformInputValue(this.cardForm.controls['cardNumber'].value, 19));
        this.cardForm.controls['cardMonth'].setValue(this.transformInputValue(this.cardForm.controls['cardMonth'].value, 2));
        this.cardForm.controls['cardYear'].setValue(this.transformInputValue(this.cardForm.controls['cardYear'].value, 2));
        this.cardForm.controls['cardCvv'].setValue(this.transformInputValue(this.cardForm.controls['cardCvv'].value, 3));
    }

    private initForm(): void {
        const cardNumber = JSON.parse(localStorage.getItem('card-data'));
        this.cardForm = new FormGroup({
            'cardNumber': new FormControl(cardNumber?.cardNumber, [Validators.required, Validators.minLength(19)]),
            'cardMonth': new FormControl(cardNumber?.cardMonth, [Validators.required, Validators.minLength(2), Validators.min(1), Validators.max(12)]),
            'cardYear': new FormControl(cardNumber?.cardYear, [Validators.required, Validators.minLength(2)]),
            'cardCvv': new FormControl(cardNumber?.cardCvv, [Validators.required]),
        });
    }
}
