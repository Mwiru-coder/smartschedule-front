import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ADD_GROUP_MUTATION,
  UPDATE_GROUP_MUTATION,
  DELETE_GROUP_MUTATION, } from 'src/app/query-mutation';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  groups: any[] = [];
  isEditMode = false;
  groupForm: {
    groupName: string,
    groupId: string,
    academicYear: string,
    courseCode: string,
    programCode: string,
    studentNo: number,
    departmentId: string,
  } = {
    groupName: '',
    groupId: '',
    academicYear: '',
    courseCode: '',
    programCode: '',
    studentNo: 0,
    departmentId: '',
  };
  constructor(private apollo: Apollo , private snackBar: MatSnackBar) {
    this.fetchGroups();
  }
  fetchGroups() {

    this.groups = [];
  }
  addGroup() {
    this.apollo.mutate({
      mutation: ADD_GROUP_MUTATION,
      variables: this.groupForm
    }).subscribe({
      next:(res:any) => {
        if (res.data.addGroup.success) {
          this.showNotification('Group added successfully', 'success');
        } else {
          this.showNotification('Failed to add group;' + res.data.addGroup.message, 'error');
        }
      this.fetchGroups();
      this.clearForm();
      },
      error: (error) => this.showNotification('error: ' + error.message, 'error')
    });
  }
  editGroup(group: any) {
    this.groupForm = { ...group };
    this.isEditMode = true;
  }

  updateGroup() {
    this.apollo.mutate({
      mutation: UPDATE_GROUP_MUTATION,
      variables: this.groupForm
    }).subscribe({
      next:(res:any) => {
        if (res.data.updateGroup.success) {
          this.showNotification('Group updated successfully', 'success');
        } else {
          this.showNotification('Failed to update group;' + res.data.updateGroup.message, 'error');
        }
      this.fetchGroups();
      this.clearForm();
      },
      error: (error) => this.showNotification('error: ' + error.message, 'error')

    });
  }
  deleteGroup(groupId: string) {
    this.apollo.mutate({
      mutation: DELETE_GROUP_MUTATION,
      variables: { groupId }
    }).subscribe({
      next:(res:any) => {
        if (res.data.deleteGroup.success) {
          this.showNotification('Group deleted successfully', 'success');
        } else {
          this.showNotification('Failed to delete group;' + res.data.deleteGroup.message, 'error');
        } 
      this.fetchGroups();
      this.clearForm();
      },
      error: (error) => this.showNotification('error: ' + error.message, 'error')

    });
  }
  clearForm() {
    this.groupForm = {
      groupName: '',
      groupId: '',
      academicYear: '',
      courseCode: '',
      programCode: '',
      studentNo: 0,
      departmentId: '',
    };
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
  // method to handle form submission
  onSubmit() {
    if (this.isEditMode) {
      this.updateGroup();
    } else {
      this.addGroup();
    }
  }
  // method to handle form reset
  onReset() {
    this.clearForm();
  }
  // method to handle form validation
  validateForm() {
  
  }

}
