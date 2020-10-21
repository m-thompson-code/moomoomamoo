import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { MDCDrawer } from "@material/drawer";
import { Subscription } from 'rxjs';

import { ScrollService } from '@app/services/scroll.service';
import { ResponsiveMetadata, ResponsiveService } from '@app/services/responsive.service';

// import { environment } from '@environment';

@Component({
    selector: 'moo-navigation-drawer',
    templateUrl: './navigation-drawer.template.html',
    styleUrls: ['./navigation-drawer.style.scss']
})
export class NavigationDrawerComponent implements OnInit, AfterViewInit {
    @ViewChild('drawer', {static: true}) private _drawer!: ElementRef<HTMLInputElement>;

    public drawer!: MDCDrawer;

    private _onopened?: () => void;
    private _onclosed?: () => void;

    public useModal: boolean = false;

    private _responsiveObserver?: Subscription;

    constructor(private scrollService: ScrollService, private responsiveService: ResponsiveService) {
    }

    public ngOnInit(): void {
        this.drawer = MDCDrawer.attachTo(this._drawer.nativeElement);

        if (!this.drawer) {
            debugger;
            throw Error("Unexpected missing drawer");
        }

        this._onopened = () => {
            // console.log('_onopened');
            if (this.useModal) {
                this.scrollService.lockScroll();
            }
        }

        this._onclosed = () => {
            // console.log('_onclosed');
            if (this.useModal) {
                this.scrollService.unlockScroll();
            }
        }

        this.drawer.listen('MDCDrawer:opened', this._onopened);
        this.drawer.listen('MDCDrawer:closed', this._onclosed);

        this._responsiveObserver = this.responsiveService.observable.subscribe(value => {
            this._handleResponsiveMetadata(value);
        });

        this._handleResponsiveMetadata(this.responsiveService.responsiveMetadata);
    }

    private _handleResponsiveMetadata(responsiveMetadata: ResponsiveMetadata): void {
        if (responsiveMetadata.deviceType !== 'desktop_4k' && responsiveMetadata.deviceType !== 'desktop') {
            this.useModal = true;
        } else {
            this.useModal = false;
        }

        if (this.useModal && this.drawer.open) {
            this.scrollService.lockScroll();
        } else {
            this.scrollService.unlockScroll();
        }
    }

    // source: https://bugs.webkit.org/show_bug.cgi?id=153852 (Kareem Darkazanli 2020-04-01 19:37:31 PDT)

    public ngAfterViewInit(): void {
        // this.drawer = MDCDrawer.attachTo(this._drawer.nativeElement);

        // if (!this.drawer) {
        //     console.error("Unexpected missing drawer");
        //     debugger;
        // }

        // this._onopened = () => {
        //     console.log('_onopened');
        //     if (this.useModal) {
        //         this.scrollService.lockScroll();
        //     }
        // }

        
        // this._onclosed = () => {
        //     console.log('_onclosed');
        //     if (this.useModal) {
        //         this.scrollService.unlockScroll();
        //     }
        // }

        // this.drawer.listen('MDCDrawer:opened', this._onopened);
        // this.drawer.listen('MDCDrawer:closed', this._onclosed);
    }

    public open(): void {
        this.drawer.open = true;
    }

    public close(): void {
        this.drawer.open = false;
    }

    public toggle(): void {
        if (this.drawer.open) {
            this.close();
        } else {
            this.open();
        }
    }

    public ngOnDestroy(): void {
        this._responsiveObserver?.unsubscribe();

        this._onopened && this.drawer.unlisten('MDCDrawer:opened', this._onopened);
        this._onclosed && this.drawer.unlisten('MDCDrawer:closed', this._onclosed);
    }
}
