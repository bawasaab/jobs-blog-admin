import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendNavbarComponent } from './backend-navbar.component';

describe('BackendNavbarComponent', () => {
  let component: BackendNavbarComponent;
  let fixture: ComponentFixture<BackendNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
