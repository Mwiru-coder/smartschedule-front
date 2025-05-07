import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './layerout/sidebar/sidebar.component';
import { AuthLayoutComponent } from './layerout/auth-layout/auth-layout.component';
import { VenueComponent } from './academic/venue/venue.component';
import { ProgramComponent } from './academic/program/program.component';
import { CourseComponent } from './academic/course/course.component';
import { GroupComponent } from './academic/group/group.component';
import { ScheduleComponent } from './academic/schedule/schedule.component';
import { ViewTimetableComponent } from './academic/view-timetable/view-timetable.component';
import { InstructorComponent } from './academic/instructor/instructor.component';
const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {path:'',redirectTo:'home',pathMatch:'full'},
      { path: 'home', component: HomeComponent },
      { path: 'venues', component: VenueComponent }, // Add other pages here},
      {path: 'program', component: ProgramComponent},
      {path: 'courses', component: CourseComponent},
      {path: 'groups', component: GroupComponent},
      {path: 'schedule', component: ScheduleComponent},
      {path: 'view-timetable', component: ViewTimetableComponent},
  {
    path: 'instructor',
    component: InstructorComponent
  },    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
