import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollContainerComponent } from './scroll-container.component';

import { FavButtonModule } from '@app/components/fav-button';

import { DirectivesModule } from '@app/directives';

@NgModule({
    declarations: [ScrollContainerComponent],
    imports: [
        CommonModule,

        FavButtonModule,

        DirectivesModule,
    ],
    exports: [ScrollContainerComponent]
})
export class ScrollContainerModule { }
