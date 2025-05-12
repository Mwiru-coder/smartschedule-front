import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GET_ALL_USERS_QUERY, CREATE_USER_MUTATION, UPDATE_USER_MUTATION, DELETE_USER_MUTATION, GET_DEPARTMENTS_AND_COURSES_QUERY } from 'src/app/query-mutation';
import gql from 'graphql-tag';
@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {
  users: any[] = [];
  departments: any[] = [];
  courses: any[] = [];
  isEditMode = false;

userForm: {
  registrationNo: string,
  firstName: string,
  secondName?: string, // Make it optional if it's not always required
  lastName: string,
  email: string,
  phoneNo: string,
  password?: string, // Make it optional if it's not always required
  departmentId: string,
  courseCodes: string[], 
} = {
  registrationNo: '',
  firstName: '',
  secondName: '', // Initialize as empty
  lastName: '',
  email: '',
  phoneNo: '',
  password: '', // Initialize as empty
  departmentId: '',
  courseCodes: [],
};

  constructor(private apollo: Apollo, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchUsers();
    this.fetchDepartmentsAndCourses();
  }

  fetchUsers() {
    this.apollo.query({ query: GET_ALL_USERS_QUERY }).subscribe((result: any) => {
      this.users = result?.data?.user || [];
    });
  }

  fetchDepartmentsAndCourses() {
    this.apollo.query({ query: gql`
      query {
        department {
          departmentId
          departmentName
        }
      }
    ` }).subscribe((result: any) => {
      this.departments = result?.data?.department || [];
    });
    
    this.apollo.query({ query: gql`
      query {
        course {
          courseCode
          courseName
        }
      }
    ` }).subscribe((result: any) => {
      this.courses = result?.data?.course || [];
    });    
    
  }

  addUser() {
    const cleanedData = {
      ...this.userForm,
      secondName: this.userForm.secondName || null,
      password: this.userForm.password || null
    };
  
    this.apollo.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: cleanedData
    }).subscribe(() => {
      this.showNotification('User added successfully', 'success');
      this.fetchUsers();
      this.clearForm();
    });
  }
  

  editUser(user: any) {
    this.userForm = { ...user };
    this.isEditMode = true;
  }

  updateUser() {
    this.apollo.mutate({ mutation: UPDATE_USER_MUTATION, variables: { ...this.userForm }}).subscribe(() => {
      this.showNotification('User updated successfully', 'success');
      this.fetchUsers();
      this.clearForm();
    });
  }

  deleteUser(registrationNo: string) {
    this.apollo.mutate({ mutation: DELETE_USER_MUTATION, variables: { registrationNo }}).subscribe(() => {
      this.showNotification('User deleted successfully', 'success');
      this.fetchUsers();
    });
  }

  clearForm() {
    this.userForm = { registrationNo: '', firstName: '', lastName: '', email: '', phoneNo: '', departmentId: '', courseCodes: [] };
    this.isEditMode = false;
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white',
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
