import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListinvoiceComponent } from './listinvoice.component';

describe('ListinvoiceComponent', () => {
  let component: ListinvoiceComponent;
  let fixture: ComponentFixture<ListinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
