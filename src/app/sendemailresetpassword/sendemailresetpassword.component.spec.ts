import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendemailresetpasswordComponent } from './sendemailresetpassword.component';

describe('SendemailresetpasswordComponent', () => {
  let component: SendemailresetpasswordComponent;
  let fixture: ComponentFixture<SendemailresetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendemailresetpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendemailresetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
