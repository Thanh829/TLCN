import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedSongComponent } from './banned-song.component';

describe('BannedSongComponent', () => {
  let component: BannedSongComponent;
  let fixture: ComponentFixture<BannedSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannedSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
