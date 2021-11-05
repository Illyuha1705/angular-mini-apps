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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


});