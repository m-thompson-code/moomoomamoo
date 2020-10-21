import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NavigationDrawerService } from '@app/services/navigation-drawer.service';
import { ScrollService } from '@app/services/scroll.service';

// import { MDCTopAppBar } from '@material/top-app-bar';
import { Subscription } from 'rxjs';

// import { environment } from '@environment';

type ButtonMode = 'raised' | 'unelevated' | 'outlined' | '';

// source: https://material.io/develop/web/components/buttons

@Component({
    selector: 'moo-top-app-bar',
    templateUrl: './top-app-bar.template.html',
    styleUrls: ['./top-app-bar.style.scss']
})
export class TopAppBarComponent implements OnInit {
    // @ViewChild('topAppBar', {static: true}) private _topAppBar!: ElementRef<HTMLInputElement>;

    private _scrollObserver?: Subscription;

    public show: boolean = true;
    private _lastPosY: number = 0;

    constructor(private scrollService: ScrollService, private navigationDrawerService: NavigationDrawerService) {
    }

    public ngOnInit(): void {
        // const topAppBar = new MDCTopAppBar(this._topAppBar.nativeElement);

        this._scrollObserver = this.scrollService.observable.subscribe(posY => {
            this._handlePosY(posY);
        });
    }

    private _handlePosY(posY: number): void {
        // console.log(posY, this._lastPosY);

        if (posY < 150) {
            this.show = true;
            this._lastPosY = posY;
            return;
        }

        if (posY - this._lastPosY > 10) {
            this.show = true;
            this._lastPosY = posY;
        } else if ( this._lastPosY - posY > 10) {
            this.show = false;
            this._lastPosY = posY;
        }
    }

    public toggleNavigationDrawer(): void {
        this.navigationDrawerService.toggle();
    }

    public ngOnDestroy(): void {
        this._scrollObserver?.unsubscribe();
    }
}
