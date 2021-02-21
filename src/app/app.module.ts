import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SearchService} from './services/search.service';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search/search.component';
import {ResultsComponent} from './results/results.component';
import {LastSearchQueryComponent} from './results/last-search-query/last-search-query.component';
import {CurrentPageComponent} from './results/current-page/current-page.component';
import {ResultsSummaryComponent} from './results/results-summary/results-summary.component';
import {ObjectDisplayComponent} from './results/object-display/object-display.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, CommonModule, FormsModule],
  declarations: [AppComponent, SearchComponent, ResultsComponent, LastSearchQueryComponent,
    CurrentPageComponent, ResultsSummaryComponent, ObjectDisplayComponent],
  providers: [SearchService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
