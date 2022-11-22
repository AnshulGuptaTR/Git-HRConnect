import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupConnectsComponent } from './user-group-connects.component';

describe('UserGroupConnectsComponent', () => {
  let component: UserGroupConnectsComponent;
  let fixture: ComponentFixture<UserGroupConnectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupConnectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupConnectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
