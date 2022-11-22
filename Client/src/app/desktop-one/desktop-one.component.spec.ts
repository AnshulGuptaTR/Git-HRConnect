import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopOneComponent } from './desktop-one.component';

describe('DesktopOneComponent', () => {
  let component: DesktopOneComponent;
  let fixture: ComponentFixture<DesktopOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
