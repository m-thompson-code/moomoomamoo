import { Component } from '@angular/core';
import { FirebaseService } from '@app/services/firebase.service';
import { ScrollService } from '@app/services/scroll.service';
import { Subscription } from 'rxjs';
import { Visibility } from './directives/scroll-listener.directive';

import * as BezierEasing from 'bezier-easing';

@Component({
    selector: 'app-root',
    templateUrl: './app.template.html',
    styleUrls: ['./app.style.scss']
})
export class AppComponent {
    private scrollObserver?: Subscription;
    private _onresize?: () => void;

    public initalized: boolean = false;

    public blue: string = '';
    public green: string = '';
    public yellow: string = '';
    public orange: string = '';
    public red: string = '';

    constructor(private firebaseService: FirebaseService, private scrollService: ScrollService) {
        
    }

    public ngOnInit(): void {
        (window as any).BezierEasing = BezierEasing;
        
        if (!this.firebaseService.firebaseIsValid()) {
            debugger;
        }

        this.scrollService.init();

        this.scrollObserver = this.scrollService.observable.subscribe(value => {
            // console.log('APP', value);
        });
    }

    public ngAfterViewInit(): void {
        const updateResponsiveService = () => {
            // this.responsiveService.responsiveMetadata = this.responsiveService.getResponsiveType();
        }
        
        // Handle getting screen height css variables
        const appHeight = () => {
            try {
                const doc = document.documentElement;

                const windowHeight = window.innerHeight;

                doc.style.setProperty('--app-height-100', `${windowHeight}px`);
                doc.style.setProperty('--app-height-95', `${windowHeight * .95}px`);
                doc.style.setProperty('--app-height-50', `${windowHeight * .5}px`);
            } catch(error) {
                // if (environment.env !== 'prod') {
                    console.error(error);
                    debugger;
                // }
            }
        }

        this._onresize = () => {
            appHeight();
            updateResponsiveService();
        };

        window.addEventListener('resize', this._onresize);
        window.addEventListener('orientationchange', this._onresize);
        
        appHeight();

        // // Listten to navigation for analytics
        // this._routerEventsSub = this.router.events.subscribe(routerEvent => {
		// 	this._checkRouterEvent(routerEvent as RouterEvent);
        // });

        void this._initalize();
    }

    private _initalize(): Promise<void> {
        const promises: Promise<any>[] = [];

        this.initalized = false;

        // pass
        return Promise.all(promises).then(() => {
            this.initalized = true;
        });
    }

    public blueTest(visibility: Visibility): void {
        let r = visibility.fixedTopRatio - visibility.fixedBottomRatio;

        if (r < -1) {
            r = -1;
        } else if (r > 0) {
            r = 0;
        }
        
        this.blue = `translateX(${r * 100}%)`;
    }

    public greenTest(visibility: Visibility): void {
        let r = visibility.fixedTopRatio - visibility.fixedBottomRatio;

        if (r < -1) {
            r = -1;
        } else if (r > 0) {
            r = 0;
        }

        this.green = `translateX(${-r * 100}%)`;
    }

    public yellowTest(visibility: Visibility): void {
        let r = visibility.fixedTopRatio - visibility.fixedBottomRatio;

        if (r < -1) {
            r = -1;
        } else if (r > 0) {
            r = 0;
        }

        this.yellow = `translateX(${r * 100}%)`;
    }

    public orangeTest(visibility: Visibility): void {
        let r = visibility.fixedTopRatio - visibility.fixedBottomRatio;

        if (r < -1) {
            r = -1;
        } else if (r > 0) {
            r = 0;
        }

        this.orange = `translateX(${-r * 100}%)`;
    }

    public redTest(visibility: Visibility): void {
        let r = visibility.fixedTopRatio - visibility.fixedBottomRatio;

        if (r < -1) {
            r = -1;
        } else if (r > 0) {
            r = 0;
        }

        this.red = `translateX(${r * 100}%)`;
    }

    public onDestroy(): void {
        if (this._onresize) {
            window.removeEventListener('resize', this._onresize);
            window.removeEventListener('orientationchange', this._onresize);
        }

        this.scrollService.detach();
        this.scrollObserver?.unsubscribe();
    }
}
