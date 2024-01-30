import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ServiceService } from '../service.service';
import { AlertFunction } from '../Alert_function';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(
    private _serviceService: ServiceService,
    private router: Router,
    private _alert: AlertFunction,
  ) { }
  login() {
    let formattedData = {
      "login": this.username,
      "password": this.password,
    };
    //บันทึกข้อมูลลง database
    this._serviceService.authenticate_dpo(formattedData).subscribe((response: any) => {
      // console.log(response.result.response);

      const partner_id = response.result.response[0].partner_id
      const name = response.result.response[0].name
      const position_id = response.result.response[0].position_id
      if (response.result.response !== "ไม่พบข้อมูล") {
        if (position_id == 2) {
          localStorage.setItem('loggedIn', 'true');
          this.router.navigate(['/main/paper-consent-search']);
          localStorage.setItem('partner_id', partner_id);
          localStorage.setItem('position_id', position_id);
          localStorage.setItem('name', name);
        } else {
          localStorage.setItem('loggedIn', 'true');
          this.router.navigate(['/main/dashboard']);
          localStorage.setItem('partner_id', partner_id);
          localStorage.setItem('position_id', position_id);
          localStorage.setItem('name', name);
        }

      } else {
        // alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        this._alert.invalid_user_pass()
      }
    }
    );
    // console.log("asdw")
    // if (this.username === 'admin' && this.password === '1234') {
    //   localStorage.setItem('loggedIn', 'true'); // ตั้งค่าสถานะการล็อกอิน
    //   this.router.navigate(['/main/dashboard']); // เปลี่ยนเส้นทางไปยังหน้า Dashboard
    // } else {
    //   alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    // }
  }
}
