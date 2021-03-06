import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-profileuser',
  templateUrl: './profileuser.component.html',
  styleUrls: ['./profileuser.component.css']
})
export class ProfileuserComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private api:ApiService) { }
  data: any
  tenNguoiDung; diaChi; sDT; email: any

  formGroup; formGroupchangepass: FormGroup;

  ngOnInit(): void {
    this.getrole()
    this.api.checkadmin()
    this.api.checkRole()
    // this.api.checkstaff()
    this.initForm()
    this.currentData()
   
  }
  getrole()
  {
    
    var str=this.constructor.name
    str=str.toLowerCase()
    var a=str.search('component')
    str=str.slice(0,a)
    if(localStorage.getItem('role')=="admin" || localStorage.getItem('role')=="staff") localStorage.setItem('currentpage2',str)
    else
    localStorage.setItem('currentpage1',str)
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  initForm() {

    this.formGroup = new FormGroup({

      tenNguoiDung: new FormControl("", [Validators.required]),
      diaChi: new FormControl("", [Validators.required]),
      sDT: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
     
    });
    this.formGroupchangepass = new FormGroup({


      matKhauHienTai: new FormControl("", [Validators.required]),
      matKhauMoi: new FormControl("", [Validators.required]),
      xacNhanMatKhauMoi: new FormControl("", [Validators.required]),

    });

  }
  currentData() {





    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    this.http.get(this.api.apiuser+`xemthongtinnguoidung`, { headers: headers }).subscribe(res=>{

         this.data = res
  
        this.data = this.data.data
    
       this.diaChi = this.data[0].diaChi
      this.tenNguoiDung = this.data[0].tenNguoiDung
      this.sDT = this.data[0].sDT
      this.email = this.data[0].email
        this.formGroup = new FormGroup({


        tenNguoiDung: new FormControl(this.tenNguoiDung),
        diaChi: new FormControl(this.diaChi),
        sDT: new FormControl(this.sDT),
        email: new FormControl(this.email),

      })
  
        // for (let i = 0; i < this.array.length; i++) {
        //   if (this.array[i].role == "USER")
        //     this.arrayalluser.push(this.array[i])
        // }
    });
 
   
    
    
      








   


  }
  UpdateUser() {
   
    this.currentData()
   

    if (this.formGroup.valid) {
       this.update(this.formGroup.value).subscribe((result) => {
 

        if (result)
 

        window.location.reload();
        alert("Update th??nh c??ng");

      });

    }

    else alert("B???n ch??a nh???p ?????y ????? th??ng tin");



  }
  update(data): Observable<any> {

    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);


    return this.http.put(this.api.apiuser+`khachhangcapnhatthongtin`, data, { headers: headers });
  }
  Changepassword() {
    
   
    if (this.formGroupchangepass.valid) {
      // if(this.formGroupchangepass.controls['matKhauMoi'].value.length<8 || this.formGroupchangepass.controls['xacNhanMatKhauMoi'].value.length<8 )
      // {
      //   alert(" m???t kh???u m???i t???i thi???u 8 k?? t???");
      // }
    
      if(this.formGroupchangepass.controls['matKhauMoi'].value!=this.formGroupchangepass.controls['xacNhanMatKhauMoi'].value)
    {
      alert(" Newpassword and confirm new pasword not match");
      return
    }
       this.changepw(this.formGroupchangepass.value).subscribe((result) => {
 

        if (result)
 

        window.location.reload();
        alert(" th??nh c??ng");

       },error =>{
 
         
        if(error.error.message=="M???t kh???u m???i t???i thi???u 8 k?? t???")
        alert("M???t kh???u m???i t???i thi???u 8 k?? t???")
        if(error.error.message=="M???t kh???u hi???n t???i kh??ng ????ng!")
        alert("M???t kh???u hi???n t???i kh??ng ????ng!")
      }
      );

    }

    else alert("B???n ch??a nh???p ?????y ????? th??ng tin");


  }
  changepw(data): Observable<any> {

    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);


    return this.http.post(this.api.apiuser+`doimatkhau`, data, { headers: headers });
  }








}
