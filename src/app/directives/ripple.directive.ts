import { Directive, ElementRef, HostListener, AfterViewInit, Input, OnInit, EventEmitter, Output } from '@angular/core';

import { MDCRipple } from '@material/ripple';

@Directive({
    selector: '[mooRipple]',
})
export class RippleDirective implements OnInit {
    constructor(private element: ElementRef) {
    }

    public ngOnInit(): void {
        const buttonRipple = new MDCRipple(this.element.nativeElement);
        console.log(buttonRipple);
    }
}
