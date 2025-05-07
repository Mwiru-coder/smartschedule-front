import { Apollo, gql } from "apollo-angular";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
    LOGIN_MUTATION,
    CREATE_USER_MUTATION,
} from "../query-mutation";
import { execute } from "graphql";


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
                mutation: LOGIN_MUTATION,
                variables: {
                    registrationNo,
                    password,
                },
            })
            .pipe(map((result) => result.data));
    }




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
  }
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        userData
      },
    })
}

executeQuery(query: any, variables: any): Observable<any> {
    return this.apollo
      .query({
        query:gql`${query}`,
        variables,
        fetchPolicy: 'network-only',
      });
}

executeMutation(mutation: any, variables: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`${mutation}`,
      variables,
    });
  }
}