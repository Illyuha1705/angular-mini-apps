import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NumbersOnly } from '../../directives/card-number.directive';

let store = {};

const localStorageMock = {
    getItem: (key: string): string => store[key] || null,
    setItem: (key: string, value: string) => store[key] = value,
    removeItem: (key: string) => delete store[key],
    clear: () => store = {},
};

/*const cardFormMock: FormGroup = new FormGroup({
    'cardNumber': new FormControl( 'aa', [Validators.required, Validators.minLength(19)]),
    'cardMonth': new FormControl( 'dd', [Validators.required, Validators.minLength(2), Validators.min(1), Validators.max(12)]),
    'cardYear': new FormControl('ddf', [Validators.required, Validators.minLength(2)]),
    'cardCvv': new FormControl( 'sdf', [Validators.required]),
});*/

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [CardComponent, NumbersOnly],
                imports: [ReactiveFormsModule]
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle #saveCardData', () => {
        expect(component.saveCardData).toBe(false);
        component.toggleSaveCardData();
        expect(component.saveCardData).toBe(true);
        component.toggleSaveCardData();
        expect(component.saveCardData).toBe(false);
    });

    it('should return transformed string', () => {
       expect(component.transformInputValue('11354regtrt4gh54ghst5g84r', 19)).toBe('1135-4454-584');
    });

    it('should sent form data to LS', () => {
       component.toggleSaveCardData();

       localStorageMock.setItem('card-data', '5');
       expect(store['card-data']).toBe('5');
    });

    it( 'should not sent form data to LS and should clear LS', () => {
        localStorageMock.setItem('card-data', '5');
        localStorageMock.clear();

        expect(Object.keys(store).length).toBe(0);
    });

    it('form should be INVALID when empty', () => {
        component.ngOnInit();
        expect(component.cardForm.valid).toBeFalsy();
    });

    it('should render input elements', () => {
       const compiled = fixture.debugElement.nativeElement;

       const cardNumber = compiled.querySelector('.card__number-input');
       const cardMonth = compiled.querySelector('.input-month');
       const cardYear = compiled.querySelector('.input-year');
       const cardCvv = compiled.querySelector('.back-part__input');

       expect(cardNumber).toBeTruthy();
       expect(cardMonth).toBeTruthy();
       expect(cardYear).toBeTruthy();
       expect(cardCvv).toBeTruthy();
    });

    it('should test form validity', () => {
        const form = component.cardForm;
        expect(form.valid).toBeFalsy();

        const cardNumber = form.controls['cardNumber'];
        cardNumber.setValue('7846-3446-4688-4647');

        const cardMonth = form.controls['cardMonth'];
        cardMonth.setValue('12');

        const cardYear = form.controls['cardYear'];
        cardYear.setValue('26');

        const cardCvv = form.controls['cardCvv'];
        cardCvv.setValue('236');

        expect(form.valid).toBeTruthy();
    });

});
