import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistManagementComponent } from './artist-management.component';

describe('ArtistManagementComponent', () => {
  let component: ArtistManagementComponent;
  let fixture: ComponentFixture<ArtistManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
