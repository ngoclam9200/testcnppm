import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';
import{FormGroup} from'@angular/forms';
import {Observable} from 'rxjs';
import { ApiService } from 'src/services/api.service';
import {Router} from '@angular/router';

import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./assets/style.css']
})
export class SigninComponent implements OnInit {
 data;role:any
  formGroup : FormGroup;

 
  constructor(private http:HttpClient,
    private router:Router, private api:ApiService) { }
  
  ngOnInit() {
    localStorage.clear()
    // this.api.checkadmin()
    // this.api.checkstaff()
    this.initForm();
    
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  login(data):Observable<any>{
    
    return this.http.post(this.api.apiuser+`dangnhap`, data);
  }
  initForm(){
    this.role=false
    this.formGroup= new FormGroup({
      tenDangNhap: new FormControl("", [Validators.required]),
      matKhau: new FormControl("",[ Validators.required])
    }); 

  }
    loginProces(){

      
    if (this.formGroup.valid){
      
      
      this.login(this.formGroup.value).subscribe((result) =>{

         this.data=result
 
    
         this.role=this.getDecodedAccessToken(this.data.data)
         
      
          
         
            
   
           if(result.message=="Đăng nhập thành công" && this.role.vaiTro=="customer")
           {
            localStorage.setItem('userName',this.formGroup.controls['tenDangNhap'].value)

            localStorage.setItem('currentUser',JSON.stringify( {token:this.data.data}) );
            localStorage.setItem('role',this.role.vaiTro );
 
            this.router.navigate(['/listproduct']);
           }
           if(result.message=="Đăng nhập thành công" && this.role.vaiTro=="admin")
           {
            localStorage.setItem('userName',this.formGroup.controls['tenDangNhap'].value)

            localStorage.setItem('currentUser',JSON.stringify( {token:this.data.data}) );
            localStorage.setItem('role',this.role.vaiTro );
 
            this.router.navigate(['/allstaff']);
           }
           if(result.message=="Đăng nhập thành công" && this.role.vaiTro=="staff")
           {
            localStorage.setItem('userName',this.formGroup.controls['tenDangNhap'].value)

            localStorage.setItem('currentUser',JSON.stringify( {token:this.data.data}) );
            localStorage.setItem('role',this.role.vaiTro );
 
            this.router.navigate(['/orderadmin']);
           }

            
          

      }
      , error=>{
        
         alert(error.error.message)
        
      });
     
     
    }
    else alert("Bạn chưa nhập thông tin");
   
  
     
    
  }
  
 
Resetpassword(){

}
  

 
 
 

  

}
