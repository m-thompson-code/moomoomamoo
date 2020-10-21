import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Visibility } from '@app/directives/scroll-listener.directive';
import { ScrollService } from '@app/services/scroll.service';

// import { MDCRipple } from '@material/ripple';

@Component({
    selector: 'moo-scroll-container',
    templateUrl: './scroll-container.template.html',
    styleUrls: ['./scroll-container.style.scss']
})
export class ScrollContainerComponent {
    @ViewChild('divContainer', {static: true}) private _divContainer!: ElementRef<HTMLInputElement>;
    public buttonsState: 'show-none' | 'show-both' | 'show-scroll-up' | 'show-scroll-down' = 'show-none';
    public buttonsClass: 'absolute' | 'fixed' | 'hide' = 'hide';

    @Input() showScrollToTop: boolean = false;
    @Input() showScrollToNext: boolean = false;

    constructor(private scrollService: ScrollService) {
    }

    public handleButtons(visiblity: Visibility): void {
        // console.log(visiblity);

        if (!visiblity.visibile) {
            this.buttonsState = 'show-none';
            this.buttonsClass = 'hide';

            return;
        }

        if (visiblity.topRatio <= 1) {
            this.buttonsState = 'show-scroll-down';
        } else if (visiblity.bottomRatio <= 1) {
            this.buttonsState = 'show-scroll-up';
        } else {
            this.buttonsState = 'show-both';
        }

        if (visiblity.bottomRatio < 1) {
            this.buttonsClass = 'absolute';
        } else {
            this.buttonsClass = 'fixed';
        }
    }

    public scrollToTop() {
        // console.log(this._divContainer);

        const e = this._divContainer.nativeElement;

        const _rBox = e.getBoundingClientRect();

        // Height of element
        const height = e.offsetHeight || _rBox.height || 0;

        // Element vertical position relative to current scroll position on document
        const relativeY = _rBox.top;

        // Starting position of element on document
        const _rY = relativeY + this.scrollService.posY;

        // Ending position of element on document
        const _rY2 = _rY + height;

        // window.scrollTo(0, _rY);
        this.scrollService.scrollTo(_rY);
    }

    public scrollToNext() {
        const windowHeight = window.innerHeight;

        // console.log(this._divContainer);

        const e = this._divContainer.nativeElement;

        const _rBox = e.getBoundingClientRect();

        // Height of element
        const height = e.offsetHeight || _rBox.height || 0;

        // Element vertical position relative to current scroll position on document
        const relativeY = _rBox.top;

        // Starting position of element on document
        const _rY = relativeY + this.scrollService.posY;

        // Ending position of element on document
        const _rY2 = _rY + height;

        // window.scrollTo(0, _rY2 - windowHeight);
        // this.scrollService.scrollTo(_rY2 - windowHeight);
        this.scrollService.scrollTo(_rY2);
    }
}
