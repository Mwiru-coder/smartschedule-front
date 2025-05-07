import { Component, OnInit } from '@angular/core';
import{ Apollo} from 'apollo-angular';
import { ADD_COURSE_MUTATION,
  UPDATE_COURSE_MUTATION,
  DELETE_COURSE_MUTATION,
  GET_ALL_COURSES_QUERY,    
 } from 'src/app/query-mutation';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  courses: any[] = [];
  isEditMode = false;
  courseForm: {
    courseName: string,
    courseCode: string,
    courseCredit: number,
    programCode: string,
  } = {
    courseName: '',
    courseCode: '',
    courseCredit: 0,
    programCode: '',
  };
  constructor(private apollo: Apollo) {
    this.fetchCourses();
  }
  fetchCourses() {
    this.apollo.watchQuery({
      query: GET_ALL_COURSES_QUERY
    }).valueChanges.subscribe((result: any) => {
      this.courses = result.data.course;
    });
  } 

  addCourse() {
    this.apollo.mutate({
      mutation: ADD_COURSE_MUTATION,
      variables: this.courseForm
    }).subscribe((result: any) => {
      this.fetchCourses();
      this.clearForm();
    });
  }
  editCourse(course: any) {
    this.courseForm = { ...course };
    this.isEditMode = true;
  }
  updateCourse() {
    this.apollo.mutate({
      mutation: UPDATE_COURSE_MUTATION,
      variables: this.courseForm
    }).subscribe((result: any) => {
      this.fetchCourses();
      this.clearForm();
    });
  }

  deleteCourse(courseCode: string) {
    this.apollo.mutate({
      mutation: DELETE_COURSE_MUTATION,
      variables: { courseCode }
    }).subscribe((result: any) => {
      this.fetchCourses();
    });
  }
  clearForm() {
    this.courseForm = {
      courseName: '',
      courseCode: '',
      courseCredit: 0,
      programCode: '',
    };
    this.isEditMode = false;
  }
  // Method to handle form submission
  onSubmit() {
    if (this.isEditMode) {
      this.updateCourse();
    } else {
      this.addCourse();
    }
  }
  // Method to handle form reset
  onReset() {
    this.clearForm();
  }
  // Method to handle form validation
  validateForm() {
    // Add your form validation logic here
    // For example, check if all fields are filled
    return (
      this.courseForm.courseName &&
      this.courseForm.courseCode &&
      this.courseForm.courseCredit &&
      this.courseForm.programCode
    );
  }

}
