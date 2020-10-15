import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { MDCRipple } from '@material/ripple';

// import { environment } from '@environment';

type ButtonMode = 'raised' | 'unelevated' | 'outlined' | '';

// source: https://material.io/develop/web/components/buttons

@Component({
    selector: 'moo-button',
    templateUrl: './button.template.html',
    styleUrls: ['./button.style.scss']
})
export class ButtonComponent implements OnInit {
    @ViewChild('button', {static: true}) private _button!: ElementRef<HTMLInputElement>;
    @Input() public mode: ButtonMode = 'raised';
    @Input() public disabled?: boolean = false;
    @Input() public icon?: string;
    @Input() public text?: string;
    @Input() public trailingIcon?: string;

    constructor() {
    }

    public ngOnInit(): void {
        const buttonRipple = new MDCRipple(this._button.nativeElement);
    }
}
