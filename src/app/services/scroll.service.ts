import { Injectable } from '@angular/core';

import { interval, Observable, Subject } from 'rxjs';
import { throttle } from 'rxjs/operators';

import * as BezierEasing from 'bezier-easing';

// import { environment } from '@environment';
const DELAY_TIMER: number = 0;//50;

@Injectable({
    providedIn: 'root',
})
export class ScrollService {
    public posY: number = 0;
    private _subject: Subject<number>;
    public observable: Observable<number>;

    private _onscroll: (event: Event) => void;

    private bezierEasing: BezierEasing.EasingFunction;

    constructor() {
        this._subject = new Subject<number>();

        // Throttle scroll change (first emit is instant, but the trailing emits are delayed by DELAY_TIMER)
        this.observable = this._subject.pipe(throttle(value => {
            return interval(DELAY_TIMER);
        }, {
            leading: true, trailing: true,
        }));

        this._onscroll = this._getOnscroll();

        this.bezierEasing = BezierEasing(0.25, 0.8, 0.25, 1);
    }

    private _getOnscroll(): (event: Event) => void {
        return (event: Event) => {
            this.posY = this.getScrollPosition();
            this._subject.next(this.posY);
        };
    }

    private getScrollPosition(): number {
        return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    }

    public scrollTo(posY: number): void {
        return this._scrollTo(posY);
    }

    private _scrollTo(newY: number, oldY?: number, ms: number = 0, maxMS: number = 400): void {
        const _oldY = oldY || this.getScrollPosition();

        console.log('scrollTo', newY, _oldY, ms, maxMS);

        const frame = 1000 / 60; // ~16.67 ms

        let _ms = ms + frame;

        if (_ms >= maxMS) {
            window.scrollTo(0, newY);
            return;
        }

        let deltaY = newY - _oldY;

        const animationY = this.bezierEasing(_ms / maxMS) * deltaY;

        const posY = _oldY + animationY;

        window.scrollTo(0, posY);

        setTimeout(() => {
            this._scrollTo(newY, oldY, _ms, maxMS);
        }, frame);
    }

    public init(): void {
        window.addEventListener('scroll', this._onscroll, false);
        window.addEventListener('resize', this._onscroll, false);
        window.addEventListener('orientationchange', this._onscroll, false);
    }

    public detach(): void {
        window.removeEventListener('scroll', this._onscroll);
        window.removeEventListener('resize', this._onscroll, false);
        window.removeEventListener('orientationchange', this._onscroll, false);
    }
}
