import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertFunction } from 'src/app/Alert_function';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent {
  constructor(
    private _serviceService: ServiceService,
    private router: Router,
    private _alert: AlertFunction,
  ) { }

  name: string = ""//ชื่อ
  card_number_id: string = ""//เลขบัตรประจําตัวประชาชน
  username: string = ""//ชื่อผู้ใช้งาน
  password: string = ""//รหัสผ่าน
  phone: string = ""//เบอร์โทรศัพท์ติดต่อ
  email: string = ""//email
  userType: string = ""//userType
  relation_detail: string = ""//userType

  maxSizeInKB: number = 500;
  selected_file_1: File | null = null;
  name_file_1: string = ""
  type_file_1: string = ""
  selected_file_2: File | null = null;
  name_file_2: string = ""
  type_file_2: string = ""
  selected_file_3: File | null = null;
  name_file_3: string = ""
  type_file_3: string = ""
  ngOnInit(): void {
    // this._serviceService.authenticate().subscribe((response: any) => {
    //   // console.log(response.result.response);
    //   // this.document = response.result.response;
    // });
  }

  onFileSelected01(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file) {
        const fileSizeKB = file.size / 1024;
        if (fileSizeKB <= this.maxSizeInKB) {
          this.selected_file_1 = file;
          // console.log('ขนาดไฟล์:', fileSizeKB.toFixed(2), 'KB');
          // สามารถทำการประมวลผลเพิ่มเติมที่นี่
          this.name_file_2 = this.selected_file_1.name
          this.type_file_1 = this.selected_file_1.type
        } else {
          alert('ไฟล์ขนาดเกิน 500 KB');
          // ล้างค่า input file
          input.value = '';
        }
      }
    }
  }
  onFileSelected02(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file) {
        const fileSizeKB = file.size / 1024;
        if (fileSizeKB <= this.maxSizeInKB) {
          this.selected_file_2 = file;
          // console.log('ขนาดไฟล์:', fileSizeKB.toFixed(2), 'KB');
          // สามารถทำการประมวลผลเพิ่มเติมที่นี่
          this.name_file_2 = this.selected_file_2.name
          this.type_file_2 = this.selected_file_2.type
        } else {
          alert('ไฟล์ขนาดเกิน 500 KB');
          // ล้างค่า input file
          input.value = '';
        }
      }
    }
  }
  onFileSelected03(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file) {
        const fileSizeKB = file.size / 1024;
        if (fileSizeKB <= this.maxSizeInKB) {
          this.selected_file_3 = file;
          // console.log('ขนาดไฟล์:', fileSizeKB.toFixed(2), 'KB');
          // สามารถทำการประมวลผลเพิ่มเติมที่นี่
          this.name_file_3 = this.selected_file_3.name
          this.type_file_3 = this.selected_file_3.type
        } else {
          alert('ไฟล์ขนาดเกิน 500 KB');
          // ล้างค่า input file
          input.value = '';
        }
      }
    }
  }
  submit() {
    let formattedData = {
      "name": this.name,
      "card_number_id": this.card_number_id,
      "username": this.username,
      "password": this.password,
      "phone": this.phone,
      "email": this.email,
      "userType": this.userType,
      "relation_detail": this.relation_detail,
      "document_type_1": this.type_file_1,
      "document_name_1": this.name_file_1,
      "document_attach_1": this.selected_file_1,
      "document_type_2": this.type_file_2,
      "document_name_2": this.name_file_2,
      "document_attach_2": this.selected_file_2,
      "document_type_3": this.type_file_3,
      "document_name_3": this.name_file_3,
      "document_attach_3": this.selected_file_3
    };
    // console.log(formattedData)
    this._serviceService.add_member(formattedData).subscribe((response: any) => {
      // console.log(response.result.response)
      if (response.result.response !== "ไม่พบข้อมูล") {
        this._alert.successAdd('/main/member-search')
      } else {
        this._alert.cancelledNotification()
      }
    });

  }

}
