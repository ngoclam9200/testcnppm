import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttypeadminComponent } from './producttypeadmin.component';

describe('CompanycarComponent', () => {
  let component: ProducttypeadminComponent;
  let fixture: ComponentFixture<ProducttypeadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducttypeadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducttypeadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
