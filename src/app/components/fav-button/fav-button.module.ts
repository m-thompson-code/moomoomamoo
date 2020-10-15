import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavButtonComponent } from './fav-button.component';

import { DirectivesModule } from '../../directives';

@NgModule({
    declarations: [FavButtonComponent],
    imports: [
        CommonModule,

        DirectivesModule,
    ],
    exports: [FavButtonComponent]
})
export class FavButtonModule { }
