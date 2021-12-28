import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./assets/style.css']
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private http: HttpClient,
    private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.api.checkadmin()
    this.api.checkstaff()
    this.initForm()
  }
  initForm() {

    this.formGroup = new FormGroup({
      email: new FormControl("", [Validators.required]),
      tenDangNhap: new FormControl("", [Validators.required]),
      tenNguoiDung: new FormControl("", [Validators.required]),
      diaChi: new FormControl("", [Validators.required]),
      sDT: new FormControl("", [Validators.required]),
      matKhau: new FormControl("", [Validators.required]),
      xacNhanMatKhau: new FormControl("", [Validators.required])
    });

  }
  test() {

  }
  register(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',

      })
    };

    return this.http.post(this.api.apiuser + `dangky`, data, httpOptions);

  }
  registerProces() {

 

     {
      if (this.formGroup.valid) {
        var fullname = this.formGroup.controls['tenNguoiDung'].value;

        const sdt = this.formGroup.controls['sDT'].value;
        var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-="
    
        var checkfullname = function (string) {
          for (let i = 0; i < specialChars.length; i++) {
            if (string.indexOf(specialChars[i]) > -1) {
              return true
            }
          }
          return false;
        }
    
    
        if (checkfullname(fullname) == true) {
    
          return alert('Fullname không hợp lệ');
        }
        var checksdt = function phonenumber(string) {
          var phoneno = /^\d{10}$/;
          if(string.match(phoneno))
            {
               return true;
            }
          else
            {
         
            return false;
            }
    
        }
    
        if (checksdt(sdt) == false) {
    
          return alert('Phone number không hợp lệ');
        }
        this.register(this.formGroup.value).subscribe((result) => {

          if (result)
           alert("Đăng kí thành công");
          this.router.navigate(['/']);




        }, error => {

         alert(error.error.message)
        });



      }

      else alert("Bạn chưa nhập đầy đủ thông tin");

    }



  }

}
