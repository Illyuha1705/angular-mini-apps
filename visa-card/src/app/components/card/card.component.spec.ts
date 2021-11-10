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

const cardFormMock: FormGroup = new FormGroup({
    'cardNumber': new FormControl( 'aa', [Validators.required, Validators.minLength(19)]),
    'cardMonth': new FormControl( 'dd', [Validators.required, Validators.minLength(2), Validators.min(1), Validators.max(12)]),
    'cardYear': new FormControl('ddf', [Validators.required, Validators.minLength(2)]),
    'cardCvv': new FormControl( 'sdf', [Validators.required]),
});

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

        component.ngOnInit();
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

    it('form should be invalid when empty', () => {
       expect(component.cardForm.valid).toBeFalsy();
    });

    it('should have card data', () => {
        component.toggleSaveCardData();
        localStorageMock.setItem('card-data', JSON.stringify(cardFormMock.value));

        const cardNumbers = JSON.parse(store['card-data']) || null;
        expect(cardNumbers).toEqual({
            'cardNumber': 'aa',
            'cardMonth': 'dd',
            'cardYear': 'ddf',
            'cardCvv': 'sdf'
        });
    });
});
