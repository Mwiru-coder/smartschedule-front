import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { GET_DEPARTMENTS_AND_COURSES_QUERY } from 'src/app/query-mutation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  departments: any[] = [];
  courses: any[] = [];
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private graphqlService: GraphqlService,
    private router: Router
  ) {
    this.form = this.fb.group({
      registrationNo: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      secondName: [''],
      phoneNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      departmentId: ['', Validators.required],
      courseCodes: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.graphqlService.executeQuery(GET_DEPARTMENTS_AND_COURSES_QUERY, {}).subscribe({
      next: (result) => {
        this.departments = result.data.department;
        this.courses = result.data.course;
      },
      error: (err) => {
        console.error('Failed to load departments or courses', err);
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    const userData = {
      registrationNo: formValue.registrationNo,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      secondName: formValue.secondName || '',
      phoneNo: formValue.phoneNo,
      email: formValue.email,
      password: formValue.password,
      departmentId: formValue.departmentId,
      courseCodes: formValue.courseCodes,
    };

    this.authService.register(userData).subscribe({
      next: (result: any) => {
        if (result?.data?.createUser?.user) {
          this.success = 'Registration successful! Redirecting...';
          this.error = '';
          this.form.reset();
          setTimeout(() => this.router.navigate(['/login']), 1500);
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

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('email')) return 'Please enter a valid email address';
    if (control?.hasError('minlength')) return 'Password is too short';
    return '';
  }
}
