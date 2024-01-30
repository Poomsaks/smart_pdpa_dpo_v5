import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertFunction } from 'src/app/Alert_function';
import { ServiceService } from 'src/app/service.service';
declare var $: any;

@Component({
  selector: 'policy-doc-add',
  templateUrl: './policy-doc-add.component.html',
  styleUrls: ['./policy-doc-add.component.css']
})

export class PolicyDocAddComponent implements OnInit{
  constructor(
    private router: Router,
    private _serviceService: ServiceService,
    private http: HttpClient,
    private _alert: AlertFunction,
  ) { }
  partner: any[] = [];
  selected_inspector: any = {};
  partner_id: any;
  ngOnInit(): void {
    if (localStorage.getItem('partner_id')) {
      this.partner_id = localStorage.getItem('partner_id')
    } else {
      this.partner_id = localStorage.getItem('partner_id')
    }
    // this._serviceService.authenticate().subscribe((response: any) => {
    //   console.log(response.result.response);
    // });
    this._serviceService.get_partner().subscribe((response: any) => {
      // console.log(response.result.response);
      this.partner = response.result.response;
    });
  }
  onSelectVillage(inspector: any): void {
    this.selected_inspector = inspector.target.value;
    // console.log(this.selected_inspector)
  }

  name = ""
  onSubmit(): void {
    let formattedData = {
      "name": this.name,
      "name_create_id": this.partner_id,
      "inspector_id": this.selected_inspector,
      "document_status": "1"
    };
    // console.log(formattedData)
    //บันทึกข้อมูลลง database
    this._serviceService.add_document(formattedData).subscribe((response: any) => {
      if (response.result.response !== "ไม่พบข้อมูล") {
        this._alert.successAdd('/main/policy-doc-search')
      } else {
        this._alert.cancelledNotification()
      }
      // this.router.navigate(['/main/policy-doc-search']);
    });
  }
}
