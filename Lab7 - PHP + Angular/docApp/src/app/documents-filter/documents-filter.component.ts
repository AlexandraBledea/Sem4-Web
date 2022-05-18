import { Component, OnInit } from '@angular/core';
import { GenericService } from '../generic.service';
import { Document } from '../document';

@Component({
  selector: 'app-documents-filter',
  templateUrl: './documents-filter.component.html',
  styleUrls: ['./documents-filter.component.css']
})
export class DocumentsFilterComponent implements OnInit {

  selectedOption: string = '';
  types: string[] = [];
  // formats: string[] = [];
  filteredDocs: Document[] = [];

  prevOption: string = 'None';
  optionHistory: string[] = ["None"];

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    this.getTypes();
    // this.getFormats();
  }

  getTypes(): void{
    this.genericService.fetchTypes()
      .subscribe(types => this.types = types);
  }

  // getFormats(): void{
  //   this.genericService.fetchFormats()
  //     .subscribe(formats => this.formats = formats);
  // }

  getFilteredDocsByType(): void{
    this.prevOption = this.optionHistory[this.optionHistory.length - 1];
    this.optionHistory.push(this.selectedOption);
    this.genericService.fetchDocumentsByType(this.selectedOption)
      .subscribe(docs => {
        this.filteredDocs = docs;
      });
  }
  
  // getFilteredDocsByFormat(): void{
  //   this.prevOption = this.optionHistory[this.optionHistory.length - 1];
  //   this.optionHistory.push(this.selectedOption);
  //   this.genericService.fetchDocumentsByFormat(this.selectedOption)
  //     .subscribe(docs => {
  //       this.filteredDocs = docs;
  //     });
  // }


}
