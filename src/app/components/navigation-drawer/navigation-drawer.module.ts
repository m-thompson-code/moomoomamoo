import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationDrawerComponent } from './navigation-drawer.component';

import { DirectivesModule } from '../../directives';

@NgModule({
    declarations: [NavigationDrawerComponent],
    imports: [
        CommonModule,

        DirectivesModule,
    ],
    exports: [NavigationDrawerComponent]
})
export class NavigationDrawerModule { }
