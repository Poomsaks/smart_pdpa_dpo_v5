import { NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertFunction } from 'src/app/Alert_function';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'policy-doc-detail',
  templateUrl: './policy-doc-detail.component.html',
  styleUrls: ['./policy-doc-detail.component.css']
})
export class PolicyDocDetailComponent implements OnInit {
  @ViewChild('editor_page') editor_page!: ElementRef;
  @ViewChild('editor_view') editor_view!: ElementRef;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private _serviceService: ServiceService,
    private sanitizer: DomSanitizer,
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
      this.get_date_fist()
    });
  }

  get_date_fist() {
    let formattedData_01 = {
      "id": this.parametor,
    }
    this._serviceService.get_document_for_detail_by_id(formattedData_01).subscribe((response: any) => {
      // console.log(response.result.response)
      // console.log(response.result.response[0].doc_detail_ids[0].doc_detail)
      // Set initial content or any default configuration here
      const docDetail = response.result.response[0].doc_detail_ids;
      this.docDetail_data = docDetail

      // console.log(this.docDetail_data.length)
      this.editor_page.nativeElement.innerHTML = response.result.response[0].doc_detail_ids[0].doc_detail;

      // ส่วนของ code ที่ใช่งานได่้
      this.page_id = response.result.response[0].doc_detail_ids[0].id
      // const b = 'gggggggggggggggg';
      // const docDetail = response.result.response[0].doc_detail_ids[0].doc_detail;
      // // ทำการค้นหาและแทนที่ค่า '${b}' ใน docDetail ด้วยค่าของตัวแปร b
      // const updatedData = docDetail.replace(/\${b}/g, b);
      // this.editor_page.nativeElement.innerHTML = updatedData;


      // this.page_id = response.result.response[0].doc_detail_ids[0].id
      // const b = 'bmmmmmmmmmm';
      // const docDetail = response.result.response[0].doc_detail_ids[0].doc_detail;
      // const updatedDocDetail = `${docDetail} ${param}`;
      // // กำหนดค่าให้กับ innerHTML ของ element
      // this.editor.nativeElement.innerHTML = updatedDocDetail;

      // this.editor.nativeElement.innerHTML = `aaaaaaaaaaaaaaaa${b}aaaaaaaaaaaaaaaaa`;
      // this.editor.nativeElement.innerHTML = response.result.response[0].doc_detail_ids[0].doc_detail;


      // const editorElement = this.editor_page.nativeElement;
      // if (editorElement) {
      // this.renderer.setStyle(editorElement, 'font-family', 'TH-Sarabun New');
      // this.renderer.setStyle(editorElement, 'font-size', '16px');
      // this.renderer.setStyle(editorElement, 'font-size', '16px');
      // this.editor2.nativeElement.innerHTML = response.result.response[0].doc_detail_ids[0].doc_detail;
      // }
    });
  }
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  selectedSection: string = ''; // สร้างตัวแปรเพื่อเก็บ ID ของส่วนที่ถูกเลือก

  showSection(sectionId: string) {
    const selectedPageIndex = this.docDetail_data.findIndex((element) => element.detail_no === this.selectedSection);

    if (selectedPageIndex !== -1) {
      const selectedPage = this.docDetail_data[selectedPageIndex];
      const editorContent = this.editor_page.nativeElement.innerHTML;

      if (editorContent !== selectedPage.doc_detail) {
        const formattedData = {
          "id": parseInt(this.parametor),
          "doc_detail_ids": [{
            "detail_id": selectedPage.id,
            "detail_no": selectedPage.detail_no,
            "doc_detail": editorContent
          }]
        };

        // console.log(formattedData)
        this._serviceService.update_document(formattedData).subscribe((response: any) => {
          // console.log(response.result.response);
          let formattedData_01 = {
            "id": this.parametor,
          };
          this._serviceService.get_document_for_detail_by_id(formattedData_01).subscribe((response: any) => {
            const docDetail = response.result.response[0].doc_detail_ids;
            this.docDetail_data = docDetail;
          });
        });
      }
    }
    for (let index = 0; index < this.docDetail_data.length; index++) {
      const element = this.docDetail_data[index].id;
      const page_check = this.docDetail_data[index].detail_no;
      if (element === sectionId) {
        // console.log(element)
        this.editor_page.nativeElement.innerHTML = this.docDetail_data[index].doc_detail;
        this.selectedSection = page_check;
      }
    }

  }

  addNewSection() {
    const formattedData = {
      "id": parseInt(this.parametor),
      "doc_detail_ids": [{
        "detail_no": String(this.docDetail_data.length + 1),
        "doc_detail": ""
      }]
    };
    this._serviceService.update_document(formattedData).subscribe((response: any) => {
      console.log(response.result.response)
      // this.ngOnInit()
      let formattedData_01 = {
        "id": this.parametor,
      }
      this._serviceService.get_document_for_detail_by_id(formattedData_01).subscribe((response: any) => {
        const docDetail = response.result.response[0].doc_detail_ids;
        this.docDetail_data = docDetail
      });

      this.showSection(String(this.docDetail_data.length + 1)); // เรียกใช้ showSection() เพื่อแสดงหน้าที่เพิ่มมาใหม่
      this.selectedSection = String(this.docDetail_data.length + 1);
      this.editor_page.nativeElement.innerHTML = "";
    });
  }


  onSubmit() {
    let formattedData
    if (this.page_id) {
      formattedData = {
        "id": parseInt(this.parametor),
        "doc_detail_ids": [{
          "detail_id": this.page_id,
          "detail_no": "1",
          "doc_detail": this.editor_page.nativeElement.innerHTML
        }]
      };
    } else {
      formattedData = {
        "id": parseInt(this.parametor),
        "doc_detail_ids": [{
          "detail_no": "1",
          "doc_detail": this.editor_page.nativeElement.innerHTML
        }]
      };
    }

    // console.log(formattedData)
    //บันทึกข้อมูลลง database
    this._serviceService.update_document(formattedData).subscribe((response: any) => {
      // console.log(response.result.response)
      // this.ngOnInit()
      if (response.result.response !== "ไม่พบข้อมูล") {
        this._alert.successNotification()
        this.router.navigate(['/main/policy-doc-search']);
      } else {
        this._alert.invalid_user_pass()
      }
    });
  }

  onEditorInput(event: Event) {
    if (this.editor_page && this.editor_view) {
      const typedText = (event.target as HTMLElement).innerHTML;
      this.editor_view.nativeElement.innerHTML = typedText;
    }
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

  toggleBold() {
    document.execCommand('bold', false, '');
  }
  toggleItalic() {
    document.execCommand('italic', false, '');
  }

  // Function to toggle underline
  toggleUnderline() {
    document.execCommand('underline', false, '');
  }
  performUndo() {
    document.execCommand('undo', false, '');
  }

  // Function to perform Redo
  performRedo() {
    document.execCommand('redo', false, '');
  }
  justifyLeft() {
    const editor = document.querySelector('#editor_page');
    if (editor instanceof HTMLElement) {
      editor.setAttribute('contenteditable', 'true'); // ตรวจสอบว่า element นี้รองรับการแก้ไขได้หรือไม่
      editor.focus(); // ใช้ method focus() เมื่อ element นั้นรองรับการใช้งาน
      document.execCommand('justifyLeft', false, '');
    } else {
      console.error("Element with ID 'editor_page' not found or does not support editing.");
    }
    // document.execCommand('justifyLeft', false, '');
  }

  // Function to justify text center
  justifyCenter() {
    const editor = document.querySelector('#editor_page');
    if (editor instanceof HTMLElement) {
      editor.setAttribute('contenteditable', 'true'); // ตรวจสอบว่า element นี้รองรับการแก้ไขได้หรือไม่
      editor.focus(); // ใช้ method focus() เมื่อ element นั้นรองรับการใช้งาน
      document.execCommand('justifyCenter', false, '');
    } else {
      console.error("Element with ID 'editor_page' not found or does not support editing.");
    }
  }




  // Function to justify text right
  justifyRight() {
    const editor = document.querySelector('#editor_page');
    if (editor instanceof HTMLElement) {
      editor.setAttribute('contenteditable', 'true'); // ตรวจสอบว่า element นี้รองรับการแก้ไขได้หรือไม่
      editor.focus(); // ใช้ method focus() เมื่อ element นั้นรองรับการใช้งาน
      document.execCommand('justifyRight', false, '');
    } else {
      console.error("Element with ID 'editor_page' not found or does not support editing.");
    }
    // document.execCommand('justifyRight', false, '');
  }

  // Function to justify text full
  justifyFull() {
    const editor = document.querySelector('#editor_page');
    if (editor instanceof HTMLElement) {
      editor.setAttribute('contenteditable', 'true'); // ตรวจสอบว่า element นี้รองรับการแก้ไขได้หรือไม่
      editor.focus(); // ใช้ method focus() เมื่อ element นั้นรองรับการใช้งาน
      document.execCommand('justifyFull', false, '');
    } else {
      console.error("Element with ID 'editor_page' not found or does not support editing.");
    }

  }
  indent() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedNode = range.startContainer.parentElement;
      const span = document.createElement('span');
      span.style.marginLeft = '20px'; // เพิ่มการเยื้องด้วย CSS
      span.appendChild(range.extractContents());
      range.insertNode(span);
    }
    // document.execCommand('indent', false, '');
  }
  // Function to outdent text
  outdent() {
    this.clean_style()
    // document.execCommand('outdent', false, '');
  }

  insertUnorderedList() {
    document.execCommand('insertUnorderedList', false, '');
  }

  // Function to insert ordered list
  insertOrderedList() {
    document.execCommand('insertOrderedList', false, '');
  }

  // Function to create heading 1
  createHeading1() {
    document.execCommand('formatBlock', false, '<h1>');
  }

  // Function to create heading 2
  createHeading2() {
    document.execCommand('formatBlock', false, '<h2>');
  }

  // Function to create paragraph
  createParagraph() {
    document.execCommand('formatBlock', false, '<p>');
  }

  // Function to create subscript
  createSubscript() {
    document.execCommand('subscript', false, '');
  }

  // Function to create superscript
  createSuperscript() {
    document.execCommand('superscript', false, '');
  }

  selectedColor: string = '#000000'; // Default color

  colors = [
    { title: '#ffffaa', bgColor: '#ffffaa' },
    { title: '#aad5ff', bgColor: '#aad5ff' },
    { title: '#ffaaab', bgColor: '#ffaaab' },
    // { title: '#ffaaaa', bgColor: '#ffaaaa' },
    // { title: '#ffccc9', bgColor: '#ffccc9' },
    // { title: '#ff5656', bgColor: '#ff5656' },
    // { title: '#ffffff', bgColor: '#ffffff' },
    // { title: '#ffccc9', bgColor: '#ffccc9' },
    // { title: '#ffce93', bgColor: '#ffce93' },
    // { title: '#fffc9e', bgColor: '#fffc9e' },
    // { title: '#ffffc7', bgColor: '#ffffc7' },
    // { title: '#9aff99', bgColor: '#9aff99' },
    // { title: '#96fffb', bgColor: '#96fffb' },
    // { title: '#cdffff', bgColor: '#cdffff' },
    // { title: '#cbcefb', bgColor: '#cbcefb' },
    // { title: '#cfcfcf', bgColor: '#cfcfcf' },
    // { title: '#fd6864', bgColor: '#fd6864' },
    // { title: '#fe996b', bgColor: '#fe996b' },
    // { title: '#fffe65', bgColor: '#fffe65' },
    // { title: '#fcff2f', bgColor: '#fcff2f' },
    // { title: '#67fd9a', bgColor: '#67fd9a' },
    // { title: '#38fff8', bgColor: '#38fff8' },
    // { title: '#68fdff', bgColor: '#68fdff' },
    // { title: '#9698ed', bgColor: '#9698ed' },
    // { title: '#c0c0c0', bgColor: '#c0c0c0' },
    // { title: '#fe0000', bgColor: '#fe0000' },
    // { title: '#f8a102', bgColor: '#f8a102' },
    // { title: '#ffcc67', bgColor: '#ffcc67' },
    // { title: '#f8ff00', bgColor: '#f8ff00' },
    // { title: '#34ff34', bgColor: '#34ff34' },
    // { title: '#68cbd0', bgColor: '#68cbd0' },
    // { title: '#34cdf9', bgColor: '#34cdf9' },
    // { title: '#6665cd', bgColor: '#6665cd' },
    // { title: '#9b9b9b', bgColor: '#9b9b9b' },
    // { title: '#cb0000', bgColor: '#cb0000' },
    // { title: '#f56b00', bgColor: '#f56b00' },
    // { title: '#ffcb2f', bgColor: '#ffcb2f' },
    // { title: '#ffc702', bgColor: '#ffc702' },
    // { title: '#32cb00', bgColor: '#32cb00' },
    // { title: '#00d2cb', bgColor: '#00d2cb' },
    // { title: '#3166ff', bgColor: '#3166ff' },
    // { title: '#6434fc', bgColor: '#6434fc' },
    // { title: '#656565', bgColor: '#656565' },
    // { title: '#9a0000', bgColor: '#9a0000' },
    // { title: '#ce6301', bgColor: '#ce6301' },
    // { title: '#cd9934', bgColor: '#cd9934' },
    // { title: '#999903', bgColor: '#999903' },
    // { title: '#009901', bgColor: '#009901' },
    // { title: '#329a9d', bgColor: '#329a9d' },
    // { title: '#3531ff', bgColor: '#3531ff' },
    // { title: '#6200c9', bgColor: '#6200c9' },
    // { title: '#343434', bgColor: '#343434' },
    // { title: '#680100', bgColor: '#680100' },
    // { title: '#963400', bgColor: '#963400' },
    // { title: '#986536', bgColor: '#986536' },
    // { title: '#646809', bgColor: '#646809' },
    // { title: '#036400', bgColor: '#036400' },
    // { title: '#34696d', bgColor: '#34696d' },
    // { title: '#00009b', bgColor: '#00009b' },
    // { title: '#303498', bgColor: '#303498' },
    // { title: '#330001', bgColor: '#330001' },
    // { title: '#643403', bgColor: '#643403' },
    // { title: '#663234', bgColor: '#663234' },
    // { title: '#343300', bgColor: '#343300' },
    // { title: '#013300', bgColor: '#013300' },
    // { title: '#003532', bgColor: '#003532' },
    // { title: '#010066', bgColor: '#010066' },
    // { title: '#340096', bgColor: '#340096' },
    // { title: '#000000', bgColor: '#000000' },

  ];
  showColor(color: string) {
    this.selectedColor = color;
  }
  changeSelectionColor() {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        if (range) {
          const span = document.createElement('span');
          span.style.backgroundColor = this.selectedColor;
          range.surroundContents(span);
        }
      }
    }
  }
  Color_ff0000() {
    this.clean_style()
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        if (range) {
          const span = document.createElement('span');
          span.style.backgroundColor = "#ff0000";
          // ใส่ style ใหม่
          span.setAttribute('style', span.style.cssText);
          span.setAttribute('data-selection', 'true');
          range.surroundContents(span);
        }
      }
    }
  }

  Color_00ff00() {
    this.clean_style()
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        if (range) {
          const span = document.createElement('span');

          span.style.backgroundColor = "#00ff00";
          // ใส่ style ใหม่
          span.setAttribute('style', span.style.cssText);
          span.setAttribute('data-selection', 'true');
          range.surroundContents(span);
        }
      }
    }
  }
  Color_0000ff() {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        if (range) {
          const span = document.createElement('span');
          const oldSpan = document.createElement('span');

          // คัดลอกข้อความที่เลือกไว้
          const clonedContents = range.cloneContents();
          oldSpan.appendChild(clonedContents);

          // เอาออก style ของข้อความที่เลือก
          const spans = oldSpan.querySelectorAll('span');
          spans.forEach(span => {
            span.removeAttribute('style');
          });

          // นำเนื้อหาที่เปลี่ยนแปลงไปแทนที่ข้อความที่เลือก
          range.deleteContents();
          range.insertNode(oldSpan);
        }
      }
    }
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        if (range) {
          const span = document.createElement('span');

          span.style.backgroundColor = "#0000ff";
          // ใส่ style ใหม่
          span.setAttribute('style', span.style.cssText);
          span.setAttribute('data-selection', 'true');
          range.surroundContents(span);
        }
      }
    }
  }
  Color_ffffff() {
    this.clean_style()
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        if (range) {
          const span = document.createElement('span');

          span.style.backgroundColor = "#ffffff";
          // ใส่ style ใหม่
          span.setAttribute('style', span.style.cssText);
          span.setAttribute('data-selection', 'true');
          range.surroundContents(span);
        }
      }
    }
  }

  clean_style() {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        if (range) {
          const span = document.createElement('span');
          const oldSpan = document.createElement('span');

          // คัดลอกข้อความที่เลือกไว้
          const clonedContents = range.cloneContents();
          oldSpan.appendChild(clonedContents);

          // เอาออก style ของข้อความที่เลือก
          const spans = oldSpan.querySelectorAll('span');
          spans.forEach(span => {
            span.removeAttribute('style');
          });

          // นำเนื้อหาที่เปลี่ยนแปลงไปแทนที่ข้อความที่เลือก
          range.deleteContents();
          range.insertNode(oldSpan);
        }
      }
    }
  }
  changeSelectionColorText() {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        if (range) {
          const span = document.createElement('span');
          span.style.color = this.selectedColor;

          range.surroundContents(span);
        }
      }
    }
  }
  // TH-Sarabun New
  // TH-Charmonman
  // TH-Krub
  // TH-Srisakdi
  // TH-Niramit AS
  // TH-Charm of AU
  // TH-Kodchasal
  // TH-K2D July8
  // TH-Mali Grade 6
  // TH-Chakra Petch
  // TH-Baijam
  // TH-KoHo
  // TH-Fah Kwang

  font_data: any[] = [
    { id: '0', name: "TH-Sarabun New" },
    { id: '1', name: "TH Sarabun IT๙" },
    { id: '2', name: "times new roman" },
    { id: '3', name: "TH-Charmonman" },
    { id: '4', name: "TH-Krub" },
    { id: '5', name: "TH-Srisakdi" },
    { id: '6', name: "TH-Niramit AS" },
    { id: '7', name: "TH-Charm of AU" },
    { id: '8', name: "TH-Kodchasal" },
    { id: '9', name: "TH-K2D July8" },
    { id: '10', name: "TH-Mali Grade 6" },
    { id: '11', name: "TH-Chakra Petch" },
    { id: '12', name: "TH-Baijam" },
    { id: '13', name: "TH-KoHo" },
    { id: '14', name: "TH-Fah Kwang" },
    { id: '15', name: "Arial" }
  ];
  selectedWater: any = {};
  onSelectedWater(water: any): void {
    this.clean_style()
    const selectedFont = water.target.value; // รับค่า font ที่ถูกเลือก

    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        if (range) {
          const span = document.createElement('span');
          span.style.fontFamily = selectedFont; // กำหนด fontFamily ของ span ตาม font ที่เลือก

          const selectedText = range.extractContents(); // ดึงเนื้อหาที่ถูกเลือกใน range ออกมา
          span.appendChild(selectedText); // เพิ่มเนื้อหาที่ถูกเลือกลงใน span

          range.insertNode(span); // แทรก span ที่มีเนื้อหาที่ถูกเลือกลงใน range
        }
      }
    }
  }
  // selectedFont: string = 'Arial'; // ฟอนต์เริ่มต้น

  // changeFont() {
  //   if (window.getSelection) {
  //     const selection = window.getSelection();
  //     if (selection) {
  //       const range = selection.getRangeAt(0);
  //       if (range) {
  //         const span = document.createElement('span');
  //         span.style.fontFamily = this.selectedFont;

  //         range.surroundContents(span);
  //       }
  //     }
  //   }
  // }

  createTable() {
    const table = document.createElement('table');
    table.setAttribute('border', '1'); // เพิ่ม border attribute เพื่อแสดงขอบตาราง
    const tbody = document.createElement('tbody');

    // Loop to create rows and cells
    for (let i = 0; i < 2; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < 1; j++) {
        const cell = document.createElement('td');
        const text = document.createTextNode(`Row ${i + 1}, Col ${j + 1}`);
        cell.appendChild(text);
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    const editorPage = document.querySelector('#editor_page');
    if (editorPage) {
      editorPage.appendChild(table);
    } else {
      console.error("Element with ID 'editor_page' not found.");
    }
  }


  // createTable() {
  //   const table = this.renderer.createElement('table');
  //   this.renderer.setAttribute(table, 'border', '1'); // เพิ่ม border attribute เพื่อแสดงขอบตาราง
  //   const tbody = this.renderer.createElement('tbody');

  //   // Loop to create rows and cells
  //   for (let i = 0; i < 3; i++) {
  //     const row = this.renderer.createElement('tr');
  //     for (let j = 0; j < 3; j++) {
  //       const cell = this.renderer.createElement('td');
  //       const text = this.renderer.createText(`Row ${i + 1}, Col ${j + 1}`);
  //       this.renderer.appendChild(cell, text);
  //       this.renderer.appendChild(row, cell);
  //     }
  //     this.renderer.appendChild(tbody, row);
  //   }

  //   this.renderer.appendChild(table, tbody);
  //   this.renderer.appendChild(this.el.nativeElement.querySelector('#editor_page'), table);
  // }

  insertImageFromFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        const img = this.renderer.createElement('img');
        this.renderer.setAttribute(img, 'src', imageUrl);
        this.renderer.appendChild(this.el.nativeElement.querySelector('#editor'), img);
      };
      reader.readAsDataURL(file);
    }
  }
  fontSize = 13;
  // increaseFontSize() {
  //   this.fontSize += 1;
  //   const editorElement = this.editorContent.nativeElement;
  //   if (editorElement) {
  //     this.renderer.setStyle(editorElement, 'font-size', `${this.fontSize}px`);
  //   }
  // }

  increaseFontSize() {
    this.fontSize += 1;
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.fontSize = 'larger'; // เพิ่มขนาด font ของ span ที่สร้างขึ้น
        range.surroundContents(span);
      }
    }
  }

  decreaseFontSize() {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        document.execCommand('fontSize', false, '2'); // ลดขนาด font ลงเป็นขนาดที่ 2
      }
    }
  }


  // times new roman
  // TH Sarabun IT๙
  // TH-Sarabun New
  // TH-Charmonman
  // TH-Krub
  // TH-Srisakdi
  // TH-Niramit AS
  // TH-Charm of AU
  // TH-Kodchasal
  // TH-K2D July8
  // TH-Mali Grade 6
  // TH-Chakra Petch
  // TH-Baijam
  // TH-KoHo
  // TH-Fah Kwang

  // changeSelectionColor(color: string) {
  //   // Check browser support for Selection API
  //   if (window.getSelection) {
  //     const selection = window.getSelection();
  //     if (selection) {
  //       const range = selection.getRangeAt(0);
  //       if (range) {
  //         const span = document.createElement('span');
  //         span.style.backgroundColor = color; // Set the color here

  //         range.surroundContents(span);
  //       }
  //     }
  //   }
  // }
}
