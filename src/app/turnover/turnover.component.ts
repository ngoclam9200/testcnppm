import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators , FormArray} from '@angular/forms';
import {} from "jquery";
import { MatDialog,MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CreatebillComponent } from '../createbill/createbill.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-turnover',
  templateUrl: './turnover.component.html',
  styleUrls: ['./assets/style.css']
})
export class TurnoverComponent implements OnInit {

  constructor(private http:HttpClient, private api:ApiService) { }
tongDoanhThu:any=0
countUser:any=0
array:any=[]
data:any=[]
datacancle:any=[]
datauser:any=[]
dataturnover:any=[]
chitietHD:any=[]
countproductsold:any=0
countbillcancle:any=0
  ngOnInit(): void {
    this.getrole()
    this.api.checkuser()
    this.allturnover()
    this.api.checkRole()
    this.api.checkstaff()
    this.getcountcustommer()
    this.allcountbillcancle()
    this.gettopproduct()
  }
  getrole()
  {
  
   
    var str=this.constructor.name
    str=str.toLowerCase()
    var a=str.search('component')
    str=str.slice(0,a)
    if(localStorage.getItem('role')=="customer" || localStorage.getItem('role')=="staff") localStorage.setItem('currentpage2',str)
    else
    localStorage.setItem('currentpage1',str)
  }
  allturnover()
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     var a={}
     this.http.get(this.api.apibill+`Xemhoadontheotrangthaiadmin/4` , { headers: headers }).subscribe(res => {
   
      this.dataturnover=res
      this.dataturnover=this.dataturnover.data

     
      var t=0
      for(let i=0 ;i<this.dataturnover.length;i++)
      t =t+this.dataturnover[i].tongHoaDon
      this.tongDoanhThu=t
      var count=0
      for(let i=0 ;i<this.dataturnover.length;i++)
      {
        this.chitietHD=this.dataturnover[i].chiTietHD
        for(let i=0 ;i<this.chitietHD.length;i++)
      {
        count=count+ this.chitietHD[i].soLuongDat
      }
      }
      
      this.countproductsold=count
      


    
     
      
 
      
     
  

   });
  }
  allcountbillcancle()
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     var a={}
     this.http.get(this.api.apibill+`Xemhoadontheotrangthaiadmin/5` , { headers: headers }).subscribe(res => {

      this.datacancle=res
      this.datacancle=this.datacancle.data
      this.countbillcancle=this.datacancle.length
     
     
      
      
      


    
     
      
 
      
     
  

   });
  }
  getcountcustommer() {
    
    this.api.getcustommer().subscribe(res=>{

         this.datauser = res
  
        this.array = this.datauser.data
        this.countUser=this.array.length
       
     
  
        
    })
   
    
  
    }
    gettopproduct()
    {
      let headers = new HttpHeaders();
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
       headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
       var a={}
       this.http.get(this.api.apiproduct+`topsanphambanchay/6` , { headers: headers }).subscribe(res => {
        
        this.data=res
        this.data=this.data.data

     
       
       
        
        
        
  
  
      
       
        
   
        
       
    
  
     });

    }
  
  

}
