import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'print-document',
  templateUrl: './print-document.component.html',
  styleUrls: ['./print-document.component.css']
})
export class PrintDocumentComponent implements OnInit {
  @ViewChild('editor') editor!: ElementRef;
  constructor(
    private _serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  document_detail: [] = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      const data = JSON.parse(params['data']); // แปลงค่า data จาก string เป็น object
      const id = data.id; // ดึงค่า id จาก object data

      const applicationData = {
        id: id,
      }
      // console.log(id)
      this._serviceService.get_document_for_detail_by_id(applicationData).subscribe((response: any) => {
        this.editor.nativeElement.innerHTML = response.result.response[0].doc_detail_ids[0].doc_detail;

        setTimeout(() => {
          window.print(); // ทำการพิมพ์หลังจากที่ข้อมูลแสดงผลครบทั้งหมด
        }, 500);
      });

    });
  }

}
