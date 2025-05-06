import { Injectable } from '@angular/core';
import { GraphqlService } from './graphql.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey: string = 'authToken'; // Define the tokenKey property

  constructor(private graphqlService: GraphqlService) { }

  login(registrationNo: string, password: string): Observable<any> {
    return this.graphqlService.loginUser(registrationNo, password).pipe(
      tap((response) => {
        // Handle successful login response
        console.log('Login successful:', response);
      }),
      catchError((error) => {
        // Handle error response
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  register(
    registrationNo: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    return this.graphqlService.register(registrationNo, email, password, firstName, lastName).pipe(
      tap((response) => {
        // Handle successful registration response
        console.log('Registration successful:', response);
      }),
      catchError((error) => {
        // Handle error response
        console.error('Registration error:', error);
        throw error;
      })
    );
  }


logout(): void {
  localStorage.removeItem(this.tokenKey);
}

isLoggedIn(): boolean {
  return !!localStorage.getItem(this.tokenKey);
}

getToken(): string | null {
  return localStorage.getItem(this.tokenKey);
}
}
