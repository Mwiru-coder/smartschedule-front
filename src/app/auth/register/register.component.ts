import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      registrationNo: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      secondName: [''], // optional, but you can make it required
      phoneNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      departmentId: ['', Validators.required],
      courseCodes: this.fb.array([], Validators.required), // Must push at least one
    });
  }

  // For now, just hardcode one course code for demo purposes
  ngOnInit() {
    (this.form.get('courseCodes') as FormArray).push(this.fb.control('1'));
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const userData = this.form.value;

    this.authService.register(userData).subscribe({
      next: (result) => {
        if (result) {
          this.success = 'Registration successful! Redirecting to login...';
          this.error = '';
          this.form.reset();

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
      }
    });
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('email')) return 'Please enter a valid email address';
    if (control?.hasError('minlength')) return 'Password is too short';
    return '';
  }
}
