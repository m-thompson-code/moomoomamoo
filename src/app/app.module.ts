import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from './components/button';
import { ScrollContainerModule } from './components/scroll-container';

import { ServicesModule } from './services';

import { DirectivesModule } from './directives';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,

        ButtonModule,
        ScrollContainerModule,

        ServicesModule,
        
        DirectivesModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
