import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertFunction } from 'src/app/Alert_function';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'policy-doc-search',
  templateUrl: './policy-doc-search.component.html',
  styleUrls: ['./policy-doc-search.component.css']
})
export class PolicyDocSearchComponent implements OnInit {
  constructor(
    private _serviceService: ServiceService,
    private router: Router,
    private _alert: AlertFunction,
  ) { }

  document: any[] = [];
  ngOnInit(): void {
    // this._serviceService.authenticate().subscribe((response: any) => {
    //   console.log(response.result.response);
    //   // this.document = response.result.response;
    // });
    this._serviceService.get_document_search().subscribe((response: any) => {
      // console.log(response.result.response);
      this.document = response.result.response;
    });
  }
  @ViewChild('exampleModal') exampleModal!: ElementRef;
  onSubmit(id: number) {
    let formattedData_01 = {
      "id": id,
    }
    this._serviceService.get_document_for_detail_by_id(formattedData_01).subscribe((response: any) => {
      if (response.result.response) {
        let formattedData = {
          "name": response.result.response[0].name,
          "name_create_id": response.result.response[0].name_create_id,
          "inspector_id": response.result.response[0].inspector_id,
          "doc_detail_ids": response.result.response[0].doc_detail_ids
        };
        //บันทึกข้อมูลลง database
        this._serviceService.add_status_document_detail(formattedData).subscribe((response: any) => {
            // console.log(response.result.response);
            if (response.result.response !== "ไม่พบข้อมูล") {
              // this.ngOnInit()
              this._alert.send_doc('/main/paper-consent-search')
              // this.router.navigate(['/main/dashboard']);
            } else {
              this._alert.invalid_user_pass()
            }

          },
        );
      }
    });

  }

  add_doc() {
    this.router.navigate(['/main/policy-doc-add']);
  }
  goToDoc_01(id: number) {
    const applicationData = {
      id: id,
    }
    const applicationDataString = JSON.stringify(applicationData);
    this.router.navigate(['/main/policy-doc-detail'], { queryParams: { data: applicationDataString } })
  }

  goToReport(id: number) {
    const applicationData = {
      id: id,
    }
    const applicationDataString = JSON.stringify(applicationData);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/print-document'], { queryParams: { data: applicationDataString } })
    );

    window.open(url, '_blank');
  }
}
