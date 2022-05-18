import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsFilterFormatComponent } from './documents-filter-format.component';

describe('DocumentsFilterFormatComponent', () => {
  let component: DocumentsFilterFormatComponent;
  let fixture: ComponentFixture<DocumentsFilterFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsFilterFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsFilterFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
