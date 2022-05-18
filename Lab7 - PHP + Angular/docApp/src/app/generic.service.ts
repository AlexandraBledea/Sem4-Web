import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Document } from './document';

@Injectable({
  providedIn: 'root'
})

export class GenericService {
  private backendUrl = 'http://localhost/lab7/controller/controller.php'; // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  fetchDocuments(): Observable<Document[]>{
    return this.http.get<Document[]>(this.backendUrl+'?action=selectAllDocuments')
      .pipe(catchError(this.handleError<Document[]>('fetchDocuments', [])));
  }

  fetchTypes(): Observable<string[]>{
    let url = `${this.backendUrl}?action=getTypes`;
    return this.http.get<string[]>(url)
      .pipe(catchError(this.handleError<string[]>('fetchTypes', [])));
  }

  fetchFormats(): Observable<string[]>{
    let url = `${this.backendUrl}?action=getFormats`;
    return this.http.get<string[]>(url)
      .pipe(catchError(this.handleError<string[]>('fetchFormats', [])));
  }

  fetchDocumentsByType(type: string): Observable<Document[]>{
    let url = `${this.backendUrl}?action=getFilteredDocsByType&type=${type}`;
    return this.http.get<Document[]>(url)
      .pipe(catchError(this.handleError<Document[]>('fetchDocumentsByType', [])));
  }

  fetchDocumentsByFormat(format: string): Observable<Document[]>{
    let url = `${this.backendUrl}?action=getFilteredDocsByFormat&format=${format}`;
    return this.http.get<Document[]>(url)
      .pipe(catchError(this.handleError<Document[]>('fetchDocumentsByFormat', [])));
  }

  /** POST: add a new document to the database */
  addDocument(doc: Document): Observable<any>{
    // const body = JSON.stringify(doc);
    // return this.http.post<any>(this.backendUrl, body)
    //   .pipe(catchError(this.handleError<any>('addDocument')));

    let url = `${this.backendUrl}?action=addDocument&id=${doc.id}&title=${doc.title}&author=${doc.author}&numberPages=${doc.numberPages}&type=${doc.type}&format=${doc.format}`
    return this.http.get<string>(url)
      .pipe(catchError(this.handleError<string>('addDocument', "")));
  }

  updateDocument(doc: Document): Observable<any>{
    // return this.http.get<string>(this.backendUrl+'?action=updateDocument&id=' + doc.id +'&title=' + doc.title
    //   + '&author=' + doc.author + '&numberPages=' + doc.numberPages + '&type=' + doc.type + '&format=' + doc.format)
    //   .pipe(catchError(this.handleError<string>('updateDocument', "")));
  
    let url = `${this.backendUrl}?action=updateDocument&id=${doc.id}&title=${doc.title}&author=${doc.author}&numberPages=${doc.numberPages}&type=${doc.type}&format=${doc.format}`
    return this.http.get<string>(url)
      .pipe(catchError(this.handleError<string>('updateDocument', "")));

  }

  deleteDocument(id: number): Observable<any>{
    let url = `${this.backendUrl}?action=deleteDocument&id=${id}`
    return this.http.get<string>(url)
      .pipe(catchError(this.handleError<string>('deleteDocument', "")));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TO DO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
