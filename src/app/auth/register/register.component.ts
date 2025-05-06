import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  form: FormGroup;
  error = '';
  success = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      registrationNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const { registrationNo, email, password, firstName, lastName } = this.form.value;
  
    this.authService
      .register(registrationNo, email, password, firstName, lastName)
      .subscribe({
        next: (result) => {
          if (result) {
            this.success = 'Registration successful! Redirecting to login...';
  
            // ✅ Wait for 1.5 seconds then redirect to login page
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500);
          } else {
            this.error = 'Registration failed. Please try again.';
          }
        },
        error: (err) => {
          this.error = 'Something went wrong. Please try again.';
          console.error(err);
        },
      });
  }
  

  // 🔥 Utility function to get error message for a field
  getErrorMessage(field: string): string {
    const control = this.form.get(field);

    if (control?.hasError('required')) {
      return 'This field is required';
    }

    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }

    return '';
  }
}
