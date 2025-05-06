// src/app/auth/login/login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      registrationNo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const { registrationNo, password } = this.form.value;
    this.authService.login(registrationNo, password).subscribe(success => {
      if (success) {
        this.router.navigate(['/home']);
      } else {
        this.error = 'Invalid credentials. Please try again.';
      }
    });
  }
}
