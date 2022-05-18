import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentsCrudComponent } from './documents-crud/documents-crud.component';
import { DocumentsHomeComponent } from './documents-home/documents-home.component';
import { DocumentsFilterComponent } from './documents-filter/documents-filter.component';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { DocumentsFilterFormatComponent } from './documents-filter-format/documents-filter-format.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentsCrudComponent,
    DocumentsHomeComponent,
    DocumentsFilterComponent,
    DocumentsFilterFormatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
