import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcustommerComponent } from './allcustommer.component';

describe('AllcustommerComponent', () => {
  let component: AllcustommerComponent;
  let fixture: ComponentFixture<AllcustommerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcustommerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcustommerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
