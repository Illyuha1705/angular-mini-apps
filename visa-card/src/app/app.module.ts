import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VisaCardModule } from './components/visa-card/visa-card.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        VisaCardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
