import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderadminComponent } from './orderadmin.component';

describe('OrderadminComponent', () => {
  let component: OrderadminComponent;
  let fixture: ComponentFixture<OrderadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
