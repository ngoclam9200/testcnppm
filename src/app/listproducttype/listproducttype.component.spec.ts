import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproducttypeComponent } from './listproducttype.component';

describe('ListcompanycarComponent', () => {
  let component: ListproducttypeComponent;
  let fixture: ComponentFixture<ListproducttypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListproducttypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListproducttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
