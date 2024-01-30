import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AlertFunction } from 'src/app/Alert_function';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'paper-consent-add',
  templateUrl: './paper-consent-add.component.html',
  styleUrls: ['./paper-consent-add.component.css']
})
export class PaperConsentAddComponent {
  // @ViewChild('editor') editor!: ElementRef;
  @ViewChild('editor_page') editor_page!: ElementRef;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private _serviceService: ServiceService,
    private _alert: AlertFunction,
  ) { }

  parametor = ""

  page_id: any[] = [];
  docDetail_data: any[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const data = JSON.parse(params['data']); // แปลงค่า data จาก string เป็น object
      const id = data.id; // ดึงค่า id จาก object data
      this.parametor = id
      let formattedData_01 = {
        "id": this.parametor,
      }
      this._serviceService.get_status_document_for_detail_by_id(formattedData_01).subscribe((response: any) => {
        // console.log(response.result.response)
        // console.log(response.result.response[0].doc_detail_ids[0].doc_detail)
        // Set initial content or any default configuration here


        const docDetail = response.result.response[0].doc_detail_ids;
        this.docDetail_data = docDetail

        // console.log(this.docDetail_data.length)
        this.editor_page.nativeElement.innerHTML = response.result.response[0].doc_detail_ids[0].doc_detail;

        // ส่วนของ code ที่ใช่งานได่้
        this.page_id = response.result.response[0].doc_detail_ids[0].id


        // this.comment = response.result.response[0].comment
        // this.editor_page.nativeElement.innerHTML = response.result.response[0].doc_detail_ids[0].doc_detail;
        // const editorElement = this.editor_page.nativeElement;
        // if (editorElement) {
        //   this.renderer.setStyle(editorElement, 'font-size', '16px');
        // }
      });
    });
  }

  selectedSection: string = ''; // สร้างตัวแปรเพื่อเก็บ ID ของส่วนที่ถูกเลือก

  showSection(sectionId: string) {
    const selectedPageIndex = this.docDetail_data.findIndex((element) => element.detail_no === this.selectedSection);
    for (let index = 0; index < this.docDetail_data.length; index++) {
      const element = this.docDetail_data[index].id;
      const page_check = this.docDetail_data[index].detail_no;
      if (element === sectionId) {
        this.editor_page.nativeElement.innerHTML = this.docDetail_data[index].doc_detail;
        this.selectedSection = page_check;
      }
    }

  }

  comment = "";
  onSave() {
    let formattedData = {
      "id": this.parametor,
      "comment": this.comment
    };
    console.log(formattedData)
    //บันทึกข้อมูลลง database
    this._serviceService.update_comment_document(formattedData).subscribe((response: any) => {
      // console.log(response.result.response);
      if (response.result.response !== "ไม่พบข้อมูล") {
        this._alert.successAdd('/main/paper-consent-search')
      } else {
        this._alert.cancelledNotification()
      }
    }
    );
  }
  ngAfterViewInit() {
    // Set initial content or any default configuration here
    // this.editor.nativeElement.innerHTML = '<p>Your initial content here...</p>';
    // const editorElement = this.editor.nativeElement;
    // if (editorElement) {
    //   this.renderer.setStyle(editorElement, 'font-size', '16px');
    //   this.editor2.nativeElement.innerHTML = '<p>Your initial content here...</p>';
    // }
  }


}
