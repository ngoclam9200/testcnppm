import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./assets/style.css']
})
export class ResetpasswordComponent implements OnInit {
  formGroupresetpass : FormGroup;
  data:any
  token:any
  constructor(private http: HttpClient, private router: Router, private api:ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){

    this.formGroupresetpass= new FormGroup({
     
      
      matKhauMoi: new FormControl("", [Validators.required]),
      xacNhanMatKhauMoi:new FormControl("", [Validators.required]),
     
    }); 
    
    

  }
  Resetpassword(){

    
    if (this.formGroupresetpass.valid) {


       this.reset(this.formGroupresetpass.value).subscribe((result) => {
       
        this.data=result
         if(result)
         {
           alert(this.data.message)

           this.router.navigate(['/']);

         }
     
 

       
         

       
       
      
       

      },error=>{
        alert(error.error.message)
      });
     

    }
    else alert("Bạn chưa nhập đầy đủ thông tin")

   

  


  }
  reset(data){
    let headers = new HttpHeaders();

  
    this.route.queryParams
    .subscribe(params => {
    
      this.token = params.token;
      
    }
  );
    var token = this.token
    
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);


    return this.http.post(this.api.apiuser+`ResetPassword`, data, {headers:headers});
  }


}
