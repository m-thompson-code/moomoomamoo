import { Directive, ElementRef, Input, OnInit, EventEmitter, Output } from '@angular/core';

import { Subscription } from 'rxjs';

import { ScrollService } from '@app/services/scroll.service';

export interface Visibility {
    topRatio: number;
    bottomRatio: number;
}

@Directive({
    selector: '[mooScrollListener]',
    exportAs:'customdirective'   //the name of the variable to access the directive
})
export class ScrollListenerDirective implements OnInit {
    private scrollObserver?: Subscription;
    @Output() visibilityChanged: EventEmitter<Visibility> = new EventEmitter();

    constructor(private scrollService: ScrollService, private element: ElementRef<HTMLElement>) {
    }

    public ngOnInit(): void {
        this._handlePosY(this.scrollService.posY);

        this.scrollObserver = this.scrollService.observable.subscribe(posY => {
            this._handlePosY(posY);
        });
    }

    public ngAfterViewInit(): void {
        this._handlePosY(this.scrollService.posY);
    }

    private _handlePosY(posY: number): void {
        const windowHeight = window.innerHeight;

        if (!windowHeight) {
            return;
        }

        const e = this.element.nativeElement;

        const _rBox = e.getBoundingClientRect();

        // Height of element
        const height = e.offsetHeight || _rBox.height || 0;

        // Element vertical position relative to current scroll position on document
        const relativeY = _rBox.top;

        // Starting position of element on document
        const _rY = relativeY + posY;

        // Ending position of element on document
        const _rY2 = _rY + height;

        // console.log(posY, relativeY, _rY, _rY2);

        // const _topVisibility = 1 - (_rY - posY) / windowHeight;
        // const _bottomVisibility = (_rY2 - posY) / windowHeight;
            
        let topVisibilityRatio = 1 - (_rY - posY) / windowHeight;
        let bottomVisibilityRatio = (_rY2 - posY) / windowHeight;

        if (topVisibilityRatio > 1) {
            topVisibilityRatio = 1;
        } else if (topVisibilityRatio < 0) {
            topVisibilityRatio = 0;
        }

        if (bottomVisibilityRatio > 1) {
            bottomVisibilityRatio = 1;
        } else if (bottomVisibilityRatio < 0) {
            bottomVisibilityRatio = 0;
        }

        // console.log(_topVisibility, _bottomVisibility);
        console.log(topVisibilityRatio, bottomVisibilityRatio);

        // let topVisibility = 'not-visibile';
        // let bottomVisibility = 'not-visibile';
        // let visible = false;

        this.visibilityChanged.emit({
            topRatio: topVisibilityRatio,
            bottomRatio: bottomVisibilityRatio,
        });

        // if (_topVisibility === 1 && _bottomVisibility === 1) {
        //     console.log("middle");
        // } else if (_topVisibility > 0 && _bottomVisibility)

        // if (posY < _rY) {
        //     if (_topVisibility >= 1) {
        //         console.log("fully visible from top");
        //         visible = true;
        //         topVisibility = 'fully-visible';
        //     } else if (_topVisibility > 0) {
        //         console.log("partcially visible from top");
        //         visible = true;
        //         topVisibility = 'partcial';
        //     } else {
        //         console.log("Not visibile from top yet");
        //         visible = false;
        //         topVisibility = 'not-visibile';
        //     }
        // } else if (posY > _rY2) {
        //     console.log("scrolled pass");
        //     visible = false;
        // } else {
        //     if (_bottomVisibility >= 1) {
        //         console.log("fully visible from bottom (middle)");
        //         visible = true;
        //         topVisibility = 'fully-visible';
        //     } else if (_bottomVisibility > 0) {
        //         console.log("partcially visible from bottom");
        //         visible = true;
        //         bottomVisibility = 'partcial';
        //     } else {
        //         console.log("Not visibile from bottom yet");
        //         visible = false;
        //         bottomVisibility = 'not-visibile';
        //     }

        //     if (_bottomVisibility >= 1) {
        //         console.log("middle");
        //         visible = true;
        //     } else {
        //         console.log("partically visible from the bottom");
        //         visible = true;
        //     }
        // }
    }

    public scrollToTop() {
        console.log(this.element);

        const e = this.element.nativeElement;

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

    public scrollToBottom() {
        const windowHeight = window.innerHeight;

        console.log(this.element);

        const e = this.element.nativeElement;

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
        this.scrollService.scrollTo(_rY2 - windowHeight);
    }

    public ngOnDestroy(): void {
        this.scrollObserver?.unsubscribe();
    }
}
