import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';  // Changed from CookBookComponent to LoginComponent

describe('LoginComponent', () => {  // Changed describe block name to match component
  let component: LoginComponent;    // Changed type from CookBookComponent to LoginComponent
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]  // Changed from CookBookComponent to LoginComponent
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);  // Changed from CookBookComponent to LoginComponent
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});