// import { Component } from '@angular/core';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html'
// })
// export class SidebarComponent {  
//   activeTab = 'Home';

//   menuItems = [
//     { key: 'home', label: 'Home', icon: 'fas fa-th', route: '/' },
//     { key: 'instructor', label: 'Instructor', icon: 'fas fa-chalkboard-teacher', route: '/instructor' },
//     { key: 'venue', label: 'Venue', icon: 'fas fa-school', route: '/venue' },
//     { key: 'programme', label: 'Programme', icon: 'fas fa-table', route: '/programme' },
//     { key: 'courses', label: 'Courses', icon: 'fas fa-book', route: '/courses' },
//     { key: 'groups', label: 'Groups', icon: 'fas fa-users', route: '/groups' },
//     { key: 'generate', label: 'Generate timetable', icon: 'fas fa-table', route: '/generate' },
//     { key: 'view', label: 'View Timetable', icon: 'fas fa-table', route: '/view' }
//   ];
//   sidebarOpen: boolean = true;
  

//   setActive(tab: string) {
//     this.activeTab = tab;
//   }

//   toggleSidebar() {
//     this.sidebarOpen = !this.sidebarOpen;
//   }
// }






import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarOpen = true;
  activeTab = 'home';

  menuItems = [
    { label: 'Home', icon: 'fas fa-table-cells', key: 'home', route: '/home' },
    { label: 'Lecturers', icon: 'fas fa-chalkboard-teacher', key: 'instructor', route: '/instructor' },
    { label: 'Venue', icon: 'fas fa-building', key: 'venue', route: '/venues' },
    { label: 'Program', icon: 'fas fa-calendar', key: 'program', route: '/program' },
    { label: 'Courses', icon: 'fas fa-book', key: 'courses', route: '/courses' },
    { label: 'Groups', icon: 'fas fa-users', key: 'groups', route: '/groups' },
    { label: 'Generate Timetable', icon: 'fas fa-calendar-alt', key: 'generate', route: '/schedule' },
    { label: 'View Timetable', icon: 'fas fa-eye', key: 'view', route: '/view-timetable' },
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setActive(key: string, route: string) {
    this.activeTab = key;
    this.router.navigate([route]);
  }
}
