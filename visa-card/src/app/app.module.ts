import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardModule } from './components/card/card.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        CardModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}