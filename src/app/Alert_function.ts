import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertFunction {
  constructor(
    private router: Router,
  ) { }
  tinyAlert() {
    Swal.fire('Hey there!');
  }
  successNotification() {
    Swal.fire({
      title: 'บันทึกข้อมูลสำเร็จ',
      text: ' ',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      location.reload();
    });
  }
  successAdd(part : string) {
    Swal.fire({
      title: 'บันทึกข้อมูลสำเร็จ',
      text: ' ',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      // location.reload();
      this.router.navigate([part]);
    });
  }
  send_doc(part : string) {
    Swal.fire({
      title: 'สงคำร้องสำเร็จ',
      text: ' ',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      // location.reload();
      this.router.navigate([part]);
    });
  }
  cancelledNotification() {
    Swal.fire('ยกเลิก', ' ', 'error');
  }
  invalid_user_pass() {
    Swal.fire('ชื่อผู็ใช้หรือรหัสผ่านไม่ถูกต้อง', ' ', 'error');
  }
  warning_out(part_in : string,part_out : string) {
    Swal.fire({
      title: 'ต้องการออกจากระบบ',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.router.navigate([part_in]);
        localStorage.removeItem('loggedIn');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigate([part_out]);
      }
    });
  }
  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }
}
