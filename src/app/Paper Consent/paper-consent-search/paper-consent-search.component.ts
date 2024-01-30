import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertFunction } from 'src/app/Alert_function';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'paper-consent-search',
  templateUrl: './paper-consent-search.component.html',
  styleUrls: ['./paper-consent-search.component.css']
})
export class PaperConsentSearchComponent implements OnInit {
  constructor(
    private _serviceService: ServiceService,
    private _alert: AlertFunction,
    private router: Router
  ) {}

  document: any[] = [];
  partner_id: any;
  position_id: any
  count_all: any;
  document_all: any[] = [];
  ngOnInit(): void {
    if (localStorage.getItem('partner_id')) {
      this.partner_id = localStorage.getItem('partner_id')
    } else {
      this.partner_id = localStorage.getItem('partner_id')
    }
    if (localStorage.getItem('position_id')) {
      this.position_id = localStorage.getItem('position_id')
    }
    this._serviceService.get_status_document_search(this.partner_id).subscribe((response: any) => {
      this.document = response.result.response;
      this.count_all = this.document.length
    });
    this._serviceService.get_data_dashboard().subscribe((response: any) => {
      this.document_all = response.result.response;
    });
  }
  openModal() {
    this._alert.successNotification()
  }

  onSubmit(id: number, swit: number) {
    // console.log(id)
    if (swit == 1) {
      let formattedData = {
        "id": id,
        "partner_id": this.partner_id,
        "document_status": "2"
      };
      // console.log(formattedData)
      //บันทึกข้อมูลลง database
      this._serviceService.update_status_document_by_cate(formattedData).subscribe((response: any) => {
        // console.log(response.result.status);
        if (response.result.response !== "ไม่พบข้อมูล") {
          this._alert.successNotification()
        } else {
          this._alert.cancelledNotification()
        }
      }
      );
    }
    else if (swit == 3) {
      let formattedData = {
        "id": id,
        "partner_id": this.partner_id,
        "document_status": "4"
      };
      // console.log(formattedData)
      //บันทึกข้อมูลลง database
      this._serviceService.update_status_document_by_cate(formattedData).subscribe((response: any) => {
        // console.log(response.result.status);
        if (response.result.response !== "ไม่พบข้อมูล") {
          this._alert.successNotification()
          // location.reload();
        } else {
          this._alert.cancelledNotification()
        }
      }
      );
    }
    else {
      let formattedData = {
        "id": id,
        "partner_id": this.partner_id,
        "document_status": "3"
      };
      // console.log(formattedData)
      //บันทึกข้อมูลลง database
      this._serviceService.update_status_document_by_cate(formattedData).subscribe((response: any) => {
        // console.log(response.result.status);
        if (response.result.response !== "ไม่พบข้อมูล") {
          this._alert.successNotification()
        } else {
          this._alert.cancelledNotification()
        }
      }
      );
    }



  }
  goToDoc_01(id: number) {
    const applicationData = {
      id: id,
    }
    const applicationDataString = JSON.stringify(applicationData);
    this.router.navigate(['/main/paper-consent-add'], { queryParams: { data: applicationDataString } })

  }
}
