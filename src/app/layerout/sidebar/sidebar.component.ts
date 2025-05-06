import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {  
  activeTab = 'Home';

  menuItems = [
    { key: 'home', label: 'Home', icon: 'fas fa-th', route: '/' },
    { key: 'instructor', label: 'Instructor', icon: 'fas fa-chalkboard-teacher', route: '/instructor' },
    { key: 'venue', label: 'Venue', icon: 'fas fa-school', route: '/venue' },
    { key: 'programme', label: 'Programme', icon: 'fas fa-table', route: '/programme' },
    { key: 'courses', label: 'Courses', icon: 'fas fa-book', route: '/courses' },
    { key: 'groups', label: 'Groups', icon: 'fas fa-users', route: '/groups' },
    { key: 'generate', label: 'Generate timetable', icon: 'fas fa-table', route: '/generate' },
    { key: 'view', label: 'View Timetable', icon: 'fas fa-table', route: '/view' }
  ];
  sidebarOpen: boolean = true;
  

  setActive(tab: string) {
    this.activeTab = tab;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}