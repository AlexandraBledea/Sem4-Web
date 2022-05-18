import { Component, OnInit } from '@angular/core';
// import { type } from 'os';
import { Document } from '../document';
import { GenericService } from '../generic.service';

@Component({
  selector: 'app-documents-crud',
  templateUrl: './documents-crud.component.html',
  styleUrls: ['./documents-crud.component.css']
})
export class DocumentsCrudComponent implements OnInit {

  documents: Document[] = [];
  // selectedDocument: Document;

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    console.log("ngOnInit called for CarCrudComponent");
    this.getDocuments();
  }

  getDocuments(): void{
    this.genericService.fetchDocuments()
      .subscribe(documents => this.documents = documents);
  }

  onUpdate(doc: Document): void{
    (<HTMLInputElement>document.getElementById("id2")).value = String(doc.id);
    (<HTMLInputElement>document.getElementById("title2")).value = (doc.title);
    (<HTMLInputElement>document.getElementById("author2")).value = (doc.author);
    (<HTMLInputElement>document.getElementById("numberPages2")).value = String(doc.numberPages);
    (<HTMLInputElement>document.getElementById("type2")).value = (doc.type);
    (<HTMLInputElement>document.getElementById("format2")).value = (doc.format);
    
    let displayVal:string = document.getElementById('update_form')!.style.display;
    if (displayVal === "none")
      document.getElementById('update_form')!.style.display = "inline";
    else document.getElementById('update_form')!.style.display = "none";

  }

  onDelete(docID: number): void{
    this.genericService.deleteDocument(docID).
    subscribe(r => {
      console.log(r.result);
      this.ngOnInit();
    });
  }

  addDocument(newID: HTMLInputElement, newTitle: HTMLInputElement, newAuthor: HTMLInputElement, newNumberPages: HTMLInputElement, newType: HTMLInputElement, newFormat: HTMLInputElement){
    let addedDocument: Document = {id: + newID.value,
      title: newTitle.value,
      author: newAuthor.value,
      numberPages: +newNumberPages.value,
      type: newType.value,
      format: newFormat.value
    };

    this.genericService.addDocument(addedDocument)
    .subscribe(r => {
      console.log(r.result);
      this.ngOnInit();
    });

    (<HTMLInputElement>document.getElementById("id1")).value = ' ';
    (<HTMLInputElement>document.getElementById("title1")).value = ' ';
    (<HTMLInputElement>document.getElementById("author1")).value = ' ';
    (<HTMLInputElement>document.getElementById("numberPages1")).value = ' ';
    (<HTMLInputElement>document.getElementById("type1")).value = ' ';
    (<HTMLInputElement>document.getElementById("format1")).value = ' ';


  }

  updateDocument(uID: HTMLInputElement, uTitle: HTMLInputElement, uAuthor: HTMLInputElement , uNumberPages: HTMLInputElement, uType: HTMLInputElement, uFormat: HTMLInputElement){
      let updatedDocument: Document = {id: +uID.value,
      title: uTitle.value,
      author: uAuthor.value,
      numberPages: +uNumberPages.value,
      type: uType.value,
      format: uFormat.value
    };

    this.genericService.updateDocument(updatedDocument)
      .subscribe(r => {
        console.log(r.result);
        document.getElementById('update_form')!.style.display = "none";
        this.ngOnInit();
      });

  }

}
