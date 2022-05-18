import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsHomeComponent } from './documents-home.component';

describe('DocumentsHomeComponent', () => {
  let component: DocumentsHomeComponent;
  let fixture: ComponentFixture<DocumentsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
