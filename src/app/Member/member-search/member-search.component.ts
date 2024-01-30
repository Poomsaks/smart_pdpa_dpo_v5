import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertFunction } from 'src/app/Alert_function';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent {
  constructor(
    private router: Router,
    private _serviceService: ServiceService,
    private _alert: AlertFunction,
  ) { }
  add_member() {
    this.router.navigate(['/main/member-add']);
  }
}
