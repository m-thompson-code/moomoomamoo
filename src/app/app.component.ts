import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FirebaseService } from '@app/services/firebase.service';
import { ScrollService } from '@app/services/scroll.service';
import { Subscription } from 'rxjs';

// import * as BezierEasing from 'bezier-easing';

import { NavigationDrawerComponent } from '@app/components/navigation-drawer/navigation-drawer.component';

import { NavigationDrawerService } from '@app/services/navigation-drawer.service';
import { ResponsiveService } from '@app/services/responsive.service';

import { Visibility } from '@app/directives/scroll-listener.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.template.html',
    styleUrls: ['./app.style.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChild('navigationDrawer', {static: true}) private _navigationDrawer!: NavigationDrawerComponent;

    private responsiveObserver?: Subscription;
    private scrollObserver?: Subscription;
    private _onresize?: () => void;
    private _detachListeners?: () => void;

    public initalized: boolean = false;

    public blue: string = '';
    public green: string = '';
    public yellow: string = '';
    public orange: string = '';
    public red: string = '';

    public onDesktop: boolean = true;

    constructor(private renderer: Renderer2, 
        private firebaseService: FirebaseService, private scrollService: ScrollService, 
        private navigationDrawerService: NavigationDrawerService, private responsiveService: ResponsiveService) {
        
    }

    public ngOnInit(): void {
        this.blue = '';
        this.green = '';
        this.yellow = '';
        this.orange = '';
        this.red = '';
        
        if (!this.firebaseService.firebaseIsValid()) {
            debugger;
        }

        this.responsiveService.init(this.renderer);
        this.scrollService.init(this.renderer);
        this.navigationDrawerService.init(this._navigationDrawer);

        this.responsiveObserver = this.responsiveService.observable.subscribe(value => {
            // console.log('APP', value);
        });

        this.scrollObserver = this.scrollService.observable.subscribe(value => {
            // console.log('APP', value);
        });
        
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
        };

        const _off__resize = this.renderer.listen('window', 'resize', this._onresize);
        const _off__orientationchange = this.renderer.listen('window', 'orientationchange', this._onresize);
        
        this._detachListeners = () => {
            _off__resize();
            _off__orientationchange();
        }

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

    public aboutMeHandler(visibility: Visibility): void {
        // console.log(visibility);

        let r = visibility.fixedTopRatio - visibility.fixedBottomRatio;

        if (r < -1) {
            r = -1;
        } else if (r > 0) {
            r = 0;
        }
        
        this.blue = `translateX(${r * 100}%)`;
        // console.log(this.blue);
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

    public ngOnDestroy(): void {
        this._detachListeners && this._detachListeners();

        this.responsiveService.detach();
        this.responsiveObserver?.unsubscribe();

        this.scrollService.detach();
        this.scrollObserver?.unsubscribe();
    }
}
