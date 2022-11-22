import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSuperUserDashboardComponent } from './super-super-user-dashboard.component';

describe('SuperSuperUserDashboardComponent', () => {
  let component: SuperSuperUserDashboardComponent;
  let fixture: ComponentFixture<SuperSuperUserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperSuperUserDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperSuperUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
