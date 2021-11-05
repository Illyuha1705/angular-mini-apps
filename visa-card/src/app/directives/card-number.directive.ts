import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: 'input[numbersOnly]'
})
export class NumbersOnly {
    @Input() inputLength: number;
    @Output() inputValueChanged$: EventEmitter<string> = new EventEmitter<string>();

    constructor(private element: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event) {
        const initialValue = this.element.nativeElement.value;
        const newValue = initialValue.replace(/[^0-9]*/g, '').replace(/(.{4})/g, '$1-').substring(0, this.inputLength);

        this.element.nativeElement.value = newValue;
        this.inputValueChanged$.emit(newValue);

        if (initialValue !== this.element.nativeElement.value) {
            event.stopPropagation();
        }
    }
}