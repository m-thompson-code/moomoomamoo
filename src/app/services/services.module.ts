import { NgModule } from '@angular/core';

import { FirebaseService } from './firebase.service';
import { ScrollService } from './scroll.service';
import { NavigationDrawerService } from './navigation-drawer.service';
import { ResponsiveService } from './responsive.service';

@NgModule({
    providers: [
        FirebaseService,
        ScrollService,
        NavigationDrawerService,
        ResponsiveService,
    ],
})
export class ServicesModule {
}
