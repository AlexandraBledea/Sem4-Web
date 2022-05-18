import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsCrudComponent } from './documents-crud.component';

describe('DocumentsCrudComponent', () => {
  let component: DocumentsCrudComponent;
  let fixture: ComponentFixture<DocumentsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
