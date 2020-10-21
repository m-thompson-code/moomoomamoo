import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopAppBarComponent } from './top-app-bar.component';

import { DirectivesModule } from '../../directives';

@NgModule({
    declarations: [TopAppBarComponent],
    imports: [
        CommonModule,

        DirectivesModule,
    ],
    exports: [TopAppBarComponent]
})
export class TopAppBarModule { }
