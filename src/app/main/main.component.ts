import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  constructor(
    private router: Router
  ) { }
  name : any
  position_id : any
  ngOnInit(): void {
    if(localStorage.getItem('name')){
      this.name = localStorage.getItem('name')
    }
    if(localStorage.getItem('position_id')){
      this.position_id = localStorage.getItem('position_id')
    }

  }
  isSidebarOpen: boolean = true;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  goToPolicyDoc() {
    this.router.navigate(['/main/policy-doc-search']);
  }
  goToDDashboard() {
    this.router.navigate(['/main/dashboard']);
  }
  goToDPaperConsent() {
    this.router.navigate(['/main/paper-consent-search']);
  }
  goToMember(){
    this.router.navigate(['/main/member-search']);
  }
  logout() {
    this.router.navigate(['/logout']);
  }
}
