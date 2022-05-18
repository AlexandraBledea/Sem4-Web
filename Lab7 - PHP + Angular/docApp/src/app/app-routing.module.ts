import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsHomeComponent } from './documents-home/documents-home.component';
import { DocumentsFilterComponent } from './documents-filter/documents-filter.component';
import { DocumentsCrudComponent } from './documents-crud/documents-crud.component';
import { DocumentsFilterFormatComponent } from './documents-filter-format/documents-filter-format.component';

const routes: Routes = [
  {path: '', redirectTo: '/documents-home', pathMatch: 'full'},
  {path: 'documents-crud', component: DocumentsCrudComponent},
  {path: 'documents-filter', component:DocumentsFilterComponent},
  {path: 'documents-home', component:DocumentsHomeComponent},
  {path: 'documents-filter-format', component:DocumentsFilterFormatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
