import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from './components/button';

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

        ServicesModule,
        
        DirectivesModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
