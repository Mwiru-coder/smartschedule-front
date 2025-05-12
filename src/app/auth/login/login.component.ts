import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      registrationNo: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.error = '';
    if (this.form.invalid) {
      this.error = 'Please fill in all required fields.';
      return;
    }
  
    const { registrationNo, password } = this.form.value;
  
    this.authService.login(registrationNo, password).subscribe({
      next: (success) => {
        if (success) this.router.navigate(['/home']);
        else this.error = 'Login failed: invalid credentials.';
      },
      error: (err) => {
        this.error = 'An error occurred. Please try again later.';
        console.error('Login error:', err);
      }
    });
    
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}