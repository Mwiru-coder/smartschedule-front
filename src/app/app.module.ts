import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './academic/group/group.component';
import { DepartmentComponent } from './academic/department/department.component';
import { ProgramComponent } from './academic/program/program.component';
import { CourseComponent } from './academic/course/course.component';
import { ScheduleComponent } from './academic/schedule/schedule.component';
import { ViewTimetableComponent } from './academic/view-timetable/view-timetable.component';   // 👈 Add this
import { VenueComponent } from './academic/venue/venue.component';
import { SidebarComponent } from './layerout/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { AuthLayoutComponent } from './layerout/auth-layout/auth-layout.component';
import { InstructorComponent } from './academic/instructor/instructor.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VenueComponent,
    GroupComponent,
    AuthLayoutComponent,
    DepartmentComponent,
    ProgramComponent,
    CourseComponent,
    ScheduleComponent,
    ViewTimetableComponent,
    SidebarComponent,
    HomeComponent,
    InstructorComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
