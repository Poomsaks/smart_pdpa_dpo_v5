import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { AlertFunction } from '../Alert_function';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    private _serviceService: ServiceService,
    private _alert: AlertFunction,
    private router: Router
  ) { }

  document: any[] = [];
  partner_id: any;
  position_id: any
  ngOnInit(): void {
    if (localStorage.getItem('partner_id')) {
      this.partner_id = localStorage.getItem('partner_id')
    } else {
      this.partner_id = localStorage.getItem('partner_id')
    }
    if (localStorage.getItem('position_id')) {
      this.position_id = localStorage.getItem('position_id')
    }
    this._serviceService.get_data_dashboard().subscribe((response: any) => {
      this.document = response.result.response;
    });
  }
}
