import { Apollo } from "apollo-angular";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


import {
    LOGIN_USER,
    REGISTER_USER,

} from "../query-mutation";

@Injectable({
    providedIn: "root",
})
export class GraphqlService {
    constructor(private apollo: Apollo) {}

    loginUser(
        registrationNo: string,
        password: string
    ): Observable<any> {
        return this.apollo
            .mutate({
                mutation: LOGIN_USER,
                variables: {
                    registrationNo,
                    password,
                },
            })
            .pipe(map((result) => result.data));
    }
    register(
        registrationNo: string, 
        email: string, 
        password: string, 
        firstName: string, 
        lastName: string): 
        Observable<any> {
        return this.apollo
          .mutate<any>({
            mutation: REGISTER_USER,
            variables: { 
                registrationNo, 
                email, password, 
                firstName, 
                lastName },
          })
          .pipe(map(result => result.data.registerUser.instructor));
      }
}