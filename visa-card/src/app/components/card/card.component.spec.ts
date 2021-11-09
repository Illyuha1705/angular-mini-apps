import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NumbersOnly } from '../../directives/card-number.directive';

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
       let string = '11354regtrt4gh54ghst5g84r';
       let result = '1135-4454-584'
       let stringLength = 19;

       expect(component.transformInputValue(string, stringLength)).toBe(result);
    });


});