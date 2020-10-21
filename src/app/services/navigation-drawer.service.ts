import { Injectable, Renderer2 } from '@angular/core';
import { NavigationDrawerComponent } from '@app/components/navigation-drawer/navigation-drawer.component';

// import { interval, Observable, Subject } from 'rxjs';
// import { throttle } from 'rxjs/operators';

// import * as BezierEasing from 'bezier-easing';

// const DELAY_TIMER: number = 0;//50;

@Injectable({
    providedIn: 'root',
})
export class NavigationDrawerService {
    // private bezierEasing: BezierEasing.EasingFunction;

    public navigationDrawer?: NavigationDrawerComponent;

    constructor() {
    }

    public getDrawer(): NavigationDrawerComponent {
        if (!this.navigationDrawer) {
            throw new Error("Unexpected missing drawer");
        }

        return this.navigationDrawer;
    }

    public init(navigationDrawer: NavigationDrawerComponent): void {
        this.navigationDrawer = navigationDrawer;
    }

    public open(): void {
        this.getDrawer().open();
    }
    
    public close(): void {
        this.getDrawer().close();
    }
    
    public toggle(): void {
        this.getDrawer().toggle();
    }
}
