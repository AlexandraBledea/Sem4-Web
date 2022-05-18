import { Component, OnInit } from '@angular/core';
import { GenericService } from '../generic.service';
import { Document } from '../document';


@Component({
  selector: 'app-documents-filter-format',
  templateUrl: './documents-filter-format.component.html',
  styleUrls: ['./documents-filter-format.component.css']
})
export class DocumentsFilterFormatComponent implements OnInit {

  selectedOption: string = '';
  // types: string[] = [];
  formats: string[] = [];
  filteredDocs: Document[] = [];

  prevOption: string = 'None';
  optionHistory: string[] = ["None"]
  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    this.getFormats();
  }

  getFormats(): void{
    this.genericService.fetchFormats()
      .subscribe(formats => this.formats = formats);
  }

  
  getFilteredDocsByFormat(): void{
    this.prevOption = this.optionHistory[this.optionHistory.length - 1];
    this.optionHistory.push(this.selectedOption);
    this.genericService.fetchDocumentsByFormat(this.selectedOption)
      .subscribe(docs => {
        this.filteredDocs = docs;
      });
  }

}
