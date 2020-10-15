import { NgModule } from '@angular/core';

import { KeepRatioDirective } from './keep-ratio.directive';
import { RippleDirective } from './ripple.directive';
import { ScrollListenerDirective } from './scroll-listener.directive';

@NgModule({
    imports: [],
    declarations: [
        KeepRatioDirective,
        RippleDirective,
        ScrollListenerDirective,
    ],
    exports: [
        KeepRatioDirective,
        RippleDirective,
        ScrollListenerDirective,
    ],
})

export class DirectivesModule {
}
