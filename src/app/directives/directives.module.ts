import { NgModule } from '@angular/core';

import { KeepRatioDirective } from './keep-ratio.directive';
import { MatchHeightDirective } from './match-height.directive';
import { RippleDirective } from './ripple.directive';
import { ScrollListenerDirective } from './scroll-listener.directive';

@NgModule({
    imports: [],
    declarations: [
        KeepRatioDirective,
        MatchHeightDirective,
        RippleDirective,
        ScrollListenerDirective,
    ],
    exports: [
        KeepRatioDirective,
        MatchHeightDirective,
        RippleDirective,
        ScrollListenerDirective,
    ],
})

export class DirectivesModule {
}
