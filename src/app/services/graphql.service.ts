import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  LOGIN_MUTATION,
  CREATE_USER_MUTATION,
  ADD_VENUE_MUTATION,
  UPDATE_VENUE_MUTATION,
  DELETE_VENUE_MUTATION,
  GET_ALL_VENUES_QUERY,
  GET_DEPARTMENTS_AND_COURSES_QUERY,
} from '../query-mutation';
import { execute } from 'graphql';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}


  

  // ✅ Fetch both departments and courses together
  getDepartmentsAndCourses(): Observable<any> {
    return this.apollo.query({
      query: GET_DEPARTMENTS_AND_COURSES_QUERY,
      fetchPolicy: 'network-only',
    }).pipe(map(result => result.data));
  }

  // Login User
  loginUser(registrationNo: string, password: string): Observable<any> {
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

  // Register User
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
    return this.apollo.mutate({
      mutation: CREATE_USER_MUTATION,
      variables:userData
    });
  }

  // Execute Query
  executeQuery(query: any, variables: any): Observable<any> {
    return this.apollo.query({
      query: query, // Directly use query without wrapping it in gql
      variables,
      fetchPolicy: 'network-only',
    });
  }

  // Execute Mutation
  executeMutation(mutation: any, variables: any): Observable<any> {
    return this.apollo.mutate({
      mutation: mutation, // Directly use mutation without wrapping it in gql
      variables,
    });
  }

  // Add Venue Mutation
  addVenue(venueData: { venueName: string; venueNumber: string; capacity: number }): Observable<any> {
    return this.executeMutation(ADD_VENUE_MUTATION, venueData);
  }

  // Update Venue Mutation
  updateVenue(venueData: { venueName: string; venueNumber: string; capacity: number }): Observable<any> {
    return this.executeMutation(UPDATE_VENUE_MUTATION, venueData);
  }

  // Delete Venue Mutation
  deleteVenue(venueNumber: string): Observable<any> {
    return this.executeMutation(DELETE_VENUE_MUTATION, { venueNumber });
  }

  // Fetch All Venues
  fetchAllVenues(): Observable<any> {
    return this.executeQuery(GET_ALL_VENUES_QUERY, {});
  }
}
