import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import{
  ADD_PROGRAM_MUTATION,
  UPDATE_PROGRAM_MUTATION,
  DELETE_PROGRAM_MUTATION,
  GET_ALL_PROGRAMS_QUERY,
  GET_PROGRAM_BY_CODE_QUERY
} from 'src/app/query-mutation';




@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent{
  programs: any[] = [];
  isEditMode= false;
  programForm:{
    programName: string,
    programCode: string,
    duration: string,
    departmentId: string,
  }={
    programName: '',
    programCode: '',
    duration: '',
    departmentId: '',
  };


  constructor(private apollo:Apollo) {
    this.fetchPrograms();
   }

   fetchPrograms() {
    this.apollo.watchQuery({
      query: GET_ALL_PROGRAMS_QUERY
    }).valueChanges.subscribe((result: any) => {
      this.programs = result.data.program;
    });
  }
  addProgram() {
    this .apollo.mutate({
      mutation: ADD_PROGRAM_MUTATION,
      variables: this.programForm
    }).subscribe((result: any) => {
      this.fetchPrograms();
      this.clearForm();
        });
  }
  editProgram(program: any) {
    this.programForm= {...program};
    this.isEditMode = true;
  }

  updateProgram() {
    this.apollo.mutate({
      mutation: UPDATE_PROGRAM_MUTATION,
      variables: this.programForm
    }).subscribe((result: any) => {
      this.fetchPrograms();
      this.clearForm();
    });
  }
  deleteProgram(programCode: string) {
    this.apollo.mutate({
      mutation: DELETE_PROGRAM_MUTATION,
      variables: { programCode }
    }).subscribe((result: any) => {
      this.fetchPrograms();
    });
  }
  clearForm() {
    this.programForm = {
      programName: '',
      programCode: '',
      duration: '',
      departmentId: '',
    };
    this.isEditMode = false;
  } 
}
