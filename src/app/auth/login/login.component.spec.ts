import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookBookComponent } from './login.component';

describe('CookBookComponent', () => {
  let component: CookBookComponent;
  let fixture: ComponentFixture<CookBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
