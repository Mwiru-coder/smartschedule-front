import { Injectable } from '@angular/core';
import { GraphqlService } from './graphql.service';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'authToken';

  constructor(private graphqlService: GraphqlService) {}

  /**
   * Log in a user using registration number and password.
   */
  login(registrationNo: string, password: string): Observable<any> {
    return this.graphqlService.loginUser(registrationNo, password).pipe(
      tap((response) => {
        const token = response?.data?.customObtainJsonWebToken?.token;
        if (token) {
          localStorage.setItem(this.tokenKey, token);
          console.log('Login successful:', response);
        } else {
          console.warn('Login response received, but no token found.');
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => error);
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
   * Log out the user by removing token.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Get the current authentication token from localStorage.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
