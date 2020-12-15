import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistRevenueComponent } from './artist-revenue.component';

describe('ArtistRevenueComponent', () => {
  let component: ArtistRevenueComponent;
  let fixture: ComponentFixture<ArtistRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
