import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CREATE_USER_MUTATION, UPDATE_USER_MUTATION, DELETE_USER_MUTATION } from 'src/app/query-mutation';


@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent   {
  users: any[] = [];
  isEditMode = false;
  userForm: {
    registrationNo: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNo: string,
    departmentId: string,
    courseCodes: string[], // Always an array of strings
  } = {
    registrationNo: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    departmentId: '',
    courseCodes: [], // Initialize as an empty array
  };
  
  constructor(private apollo: Apollo, private snackBar: MatSnackBar) {
    this.fetchUsers();
  }
  fetchUsers() {
    this.users = [];
  }
  addUser() {
    this.apollo.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {...this.userForm }
    }).subscribe((result: any) => {
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
    this.apollo.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: { ...this.userForm}
    }).subscribe((result: any) => {
      this.showNotification('User updated successfully', 'success');
      this.fetchUsers();
      this.clearForm();
    });
  }
  deleteUser(registrationNo: string) {
    this.apollo.mutate({
      mutation: DELETE_USER_MUTATION,
      variables: { registrationNo}
    }).subscribe((result: any) => {
      this.showNotification('User deleted successfully' , 'success');
      this.fetchUsers();
    });
  }
  clearForm() {
    this.userForm = {
      registrationNo: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      departmentId: '',
      courseCodes: [],
    };
    this.isEditMode = false;
  }
  showNotification(message: string,type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'big-green-600 text-white' : 'big-red-600 text-white',
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
