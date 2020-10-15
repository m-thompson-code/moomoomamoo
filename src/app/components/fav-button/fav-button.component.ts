import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { MDCRipple } from '@material/ripple';

// import { environment } from '@environment';

type ButtonMode = 'raised' | 'unelevated' | 'outlined' | '' | null | undefined;

/**
 * mini is used for smaller screens. An important note is that mini (40dpi) is smaller than accessibility standards for an interaction (48dpi)
 */
type FavButtonSize = 'standard' | 'mini' | 'auto';

// source: https://material.io/develop/web/components/buttons

@Component({
    selector: 'moo-fav-button',
    templateUrl: './fav-button.template.html',
    styleUrls: ['./fav-button.style.scss']
})
export class FavButtonComponent implements OnInit {
    @ViewChild('button', {static: true}) private _button!: ElementRef<HTMLInputElement>;
    @Input() public mode?: ButtonMode = 'raised';
    @Input() public disabled?: boolean = false;
    @Input() public icon?: string;
    @Input() public text?: string;
    @Input() public size: 'standard' | 'mini' | 'auto' = 'auto';
    @Input() public visible: boolean = true;

    constructor() {
    }

    public ngOnInit(): void {
        const buttonRipple = new MDCRipple(this._button.nativeElement);
    }
}
