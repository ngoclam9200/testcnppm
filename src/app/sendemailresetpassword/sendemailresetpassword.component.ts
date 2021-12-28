import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { data } from 'jquery';
@Component({
  selector: 'app-sendemailresetpassword',
  templateUrl: './sendemailresetpassword.component.html',
  styleUrls: ['./assets/style.css']
})
export class SendemailresetpasswordComponent implements OnInit {
  formGroupresetpass : FormGroup;
data:any
  
  constructor(private http: HttpClient, private router: Router, private api:ApiService) { }

  ngOnInit(): void {
    this.getrole()
    this.api.checkadmin()
    // this.api.checkstaff()
    this.initForm()
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
  initForm(){

    this.formGroupresetpass= new FormGroup({
     
      
      email: new FormControl("", [Validators.required]),
      url:new FormControl("http://localhost:4200/resetpassword", [Validators.required]),
     
    }); 
    
    

  }
  Resetpassword(){
    if (this.formGroupresetpass.valid) {

       this.reset(this.formGroupresetpass.value).subscribe((result) => {

         this.data=result
 

        if (result) {
          this.initForm()
          alert(this.data.message);


        }
         

       
       
        
       

      },error=>{
        alert(error.error.message)
      });
     

    }

   

  


  }
  reset(data){
    let headers = new HttpHeaders();
  
  


    return this.http.post(this.api.apiuser+`sendEmailResetPassword`, data);
  }
  

}
