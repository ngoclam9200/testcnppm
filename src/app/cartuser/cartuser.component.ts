import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators , FormArray} from '@angular/forms';
import {} from "jquery";
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { CreatebillComponent } from '../createbill/createbill.component';


@Component({
  selector: 'app-cartuser',
  templateUrl: './cartuser.component.html',
  styleUrls: ['./cartuser.component.css']
})

export class CartuserComponent implements OnInit {
  array: any = []
  data; iduser: any
  arraydata: any = []
  soLuongSP:any
  Tongtien:any
  moneysave:any
  formGroup: FormGroup;
  noproduct=true
  constructor(private http: HttpClient, private router: Router, private api:ApiService, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.getrole()
    this.api.checkadmin()
    this.api.checkRole()
    this.currentData()
    this.formGroup = new FormGroup({
      sanPhamId: new FormArray(this.array,[Validators.required]),
      soLuong: new FormControl("", [Validators.required]),
     
    });
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
  currentData() {





    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apiorder+`xemgiohang`, { headers: headers }).subscribe(res => {
       this.data = res
       this.data=this.data.data
       this.data=this.data[0]
        var totalmoney=0
       var savemoney=0
       this.soLuongSP=0
       if(this.data.length==0) this.noproduct=true
       else 
       {this.noproduct=false
       for(let i=0; i<this.data.length;i++)
     
       { this.soLuongSP += this.data[i].soLuongTrongGio
        savemoney += this.data[i].giaTien -this.data[i].giaTien*(this.data[i].giamGia/100)
        savemoney=savemoney*this.data[i].soLuongTrongGio
        totalmoney += this.data[i].giaTien
        totalmoney=totalmoney*this.data[i].soLuongTrongGio
       
      
        
       }
       this.Tongtien=totalmoney
      this.moneysave=savemoney
       }













    });


  }
 
  deleteproduct (id)
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     Swal.fire({
      title: 'Are you sure?',
      text: "Remove  product in cart",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.api.apiorder+`xoasanphamtronggiohang/` + id, { headers: headers }).subscribe(res => {
           this.Tongtien=0
          this.moneysave=0
          
         
      
    
       });
        Swal.fire(
          'Success!',
          '',
          'success'
          

        )
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      
       
      }


    })

     

  }
  increase(sanPhamId)
  {
    this.formGroup = new FormGroup({
      sanPhamId: new FormControl(sanPhamId,[Validators.required]),
      soLuong: new FormControl(1, [Validators.required]),
     
    });
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     console.log(this.formGroup.value)



    this.http.post(this.api.apiorder+`giamsoluongtronggiohang`,this.formGroup.value, { headers: headers }).subscribe(res => {
      

      this.currentData()


    }, error=>{
      Swal.fire({
       
        text: error.error.message,
        icon: 'warning',
       
 
       })

    
   
     
      
    });
    
  }
  decrease(sanPhamId)
  {
    this.formGroup = new FormGroup({
      sanPhamId: new FormControl(sanPhamId,[Validators.required]),
      soLuong: new FormControl(-1, [Validators.required]),
     
    });
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
 


    this.http.post(this.api.apiorder+`giamsoluongtronggiohang`,this.formGroup.value, { headers: headers }).subscribe(res => {
      

      this.currentData()


    }, error=>{
      Swal.fire({
       
        text: error.error.message,
        icon: 'warning',
       
 
       })

    
   
     
      
    });
    
  }
  taohoadon()
  {
    
    
   

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='600px';
    
      

    this.dialog.open(CreatebillComponent, dialogConfig);
      


  
  }
}
