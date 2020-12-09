import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSongCartComponent } from './user-song-cart.component';

describe('UserSongCartComponent', () => {
  let component: UserSongCartComponent;
  let fixture: ComponentFixture<UserSongCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSongCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSongCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
