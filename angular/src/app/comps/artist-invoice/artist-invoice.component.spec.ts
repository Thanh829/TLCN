import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistInvoiceComponent } from './artist-invoice.component';

describe('ArtistInvoiceComponent', () => {
  let component: ArtistInvoiceComponent;
  let fixture: ComponentFixture<ArtistInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
