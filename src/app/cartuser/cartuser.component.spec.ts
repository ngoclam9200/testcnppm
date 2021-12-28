import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartuserComponent } from './cartuser.component';

describe('ListbookinguserComponent', () => {
  let component: CartuserComponent;
  let fixture: ComponentFixture<CartuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
