import { Injectable } from '@angular/core';
import { GraphqlService } from './graphql.service';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isauthenticated = false;
  private readonly tokenKey = 'authToken';
  private readonly userKey = 'authUser';

  constructor(
    private graphqlService: GraphqlService,
    private router: Router
  ) {}
  login(registrationNo: string, password: string): Observable<boolean> {
    return this.graphqlService.loginUser(registrationNo, password).pipe(
      map((data) => {
        const token = data?.customObtainJsonWebToken?.token;
        const user = data?.customObtainJsonWebToken?.user;
  
        if (token) {
          localStorage.setItem(this.tokenKey, token);
          if (user) {
            localStorage.setItem(this.userKey, JSON.stringify(user));
          }
          console.log('Login successful:', data);
          return true;
        } else {
          console.warn('Login response received, but no token found.');
          return false;
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }
  
  

  /**
   * Register a new user.
   */
  register(userData: {
    registrationNo: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    secondName?: string;
    phoneNo: string;
    departmentId: string;
    courseCodes: string[];
  }): Observable<any> {
    return this.graphqlService.register(userData).pipe(
      tap((response) => {
        console.log('Registration successful:', response);
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Log out the user by removing token and user data.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  /**
   * Check if the user is logged in.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Get the current authentication token from localStorage.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Get the currently logged-in user from localStorage.
   */
  getUser(): any | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Fetch departments and courses.
   */
  getDepartmentAndCourses(): Observable<any> {
    return this.graphqlService.getDepartmentsAndCourses();
  }
}
