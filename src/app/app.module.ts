import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from './components/button';
import { ScrollContainerModule } from './components/scroll-container';
import { TopAppBarModule } from './components/top-app-bar';
import { NavigationDrawerModule } from './components/navigation-drawer';

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
        TopAppBarModule,
        NavigationDrawerModule,

        ServicesModule,
        
        DirectivesModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
