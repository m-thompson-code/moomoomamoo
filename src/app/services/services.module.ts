import { NgModule } from '@angular/core';

import { FirebaseService } from './firebase.service';
import { ScrollService } from './scroll.service';

@NgModule({
    providers: [
        FirebaseService,
        ScrollService,
    ],
})
export class ServicesModule {
}
