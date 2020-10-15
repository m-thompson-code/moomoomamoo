import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { take, throttle } from 'rxjs/operators';
// import { environment } from '@environment';

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

    constructor() {
        this._subject = new Subject<number>();

        // Throttle scroll change (first emit is instant, but the trailing emits are delayed by DELAY_TIMER)
        this.observable = this._subject.pipe(throttle((value) => {
            return interval(DELAY_TIMER);
        }, {
            leading: true, trailing: true,
        }));

        this._onscroll = this._getOnscroll();
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

    public scrollTo(newY: number, steps: number = 0): void {
        console.log('scrollTo', newY, steps);
        // console.log('scrollTo', newY, speed, acc);

        const posY = this.getScrollPosition();

        // let deltaY = Math.abs(newY - posY);
        let deltaY = newY - posY;//Math.abs();

        // let direction = (newY - posY > 0 ? 1 : -1);


        if (steps < 10000) {
            steps += 60;
            window.scrollTo(0, posY + deltaY / (10000 - steps));

            setTimeout(() => {
                this.scrollTo(newY, steps);
            }, 1000 / 60);
        } else {
            window.scrollTo(0, newY);
        }



        // if (deltaY < 50) {
        //     if (deltaY <= 2) {
        //         window.scrollTo(0, posY + direction * deltaY);
        //     } else {
        //         window.scrollTo(0, posY + direction * deltaY / 20);

        //         setTimeout(() => {
        //             this.scrollTo(newY, speed, acc);
        //         }, 1000 / 60);
        //     }
        // } else {
        //     acc += .25;

        //     if (acc > 5) {
        //         acc = 5;
        //     }

        //     speed += acc;

        //     if (speed > 50) {
        //         speed = 50;
        //     }

        //     window.scrollTo(0, posY + direction * speed);

        //     setTimeout(() => {
        //         this.scrollTo(newY, speed, acc);
        //     }, 1000 / 60);
        // }
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
