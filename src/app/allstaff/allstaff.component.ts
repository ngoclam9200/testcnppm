import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { } from '@angular/common'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router'

import * as XLSX from 'xlsx';
import { ApiService } from 'src/services/api.service';

import { FormControl, Validators } from '@angular/forms';


import { Observable } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-allstaff',
  templateUrl: './allstaff.component.html',
  styleUrls: ['./allstaff.component.css']
})
export class AllstaffComponent implements OnInit {
  array: any = []
  data: any
  arrayalluser: any = []
  tmp:any
  checkfillImage; checkfillcarName; checkfillCarInformation; checkfillairBag; checkfillbody; checkfillcarLife; checkfillcolour; checkfillcompanyName; checkfillengineType; checkfillfrontBrake; checkfillfuelConsumption; checkfillgear; checkfilllongs; checkfillnumberOfSeats; checkfillorigin; checkfilloverallSize; checkfillprice; checkfillseat; checkfillstatus; checkfilltireParameters; checkfilltopSpeed; checkfillwattage; checkfillyearOfManufacture: boolean = false

  formGroup: FormGroup
  formGroupchangeinfo: FormGroup
  @ViewChild('TABLE') TABLE: ElementRef;
  ExportTOExcel() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toLocaleDateString();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'AllUser' + today + '.xlsx');
  }

  constructor(private http: HttpClient, private router: Router,private api:ApiService) { }

  ngOnInit(): void {
    this.api.checkRole()
    this.getrole()
    this.api.checkuser()
    this.api.checkstaff()
  
    this.getstaff()
    this.initForm()
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
  getstaff() {
    
  this.api.getstaff().subscribe(res=>{
        this.data = res

      this.array = this.data.data
    

      
  })
 
  

  }
  initForm() {

    this.formGroup = new FormGroup({
     
      tenNguoiDung: new FormControl("", [Validators.required]),
      diaChi: new FormControl("", [Validators.required]),
      sDT: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      tenDangNhap: new FormControl("", [Validators.required]),
      matKhau: new FormControl("", [Validators.required]),
      xacNhanMatKhau: new FormControl("", [Validators.required]),
      
    });
    this.formGroupchangeinfo = new FormGroup({
      nguoiDungId : new FormControl("", [Validators.required]),
      tenNguoiDung: new FormControl("", [Validators.required]),
      diaChi: new FormControl("", [Validators.required]),
      sDT: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      
      
    });

  }
  register(data): Observable<any> {
   
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
      return this.http.post(this.api.apiuser+`dangkyNhanVien`, data, {headers:headers});
     
  }
  registerProces() {



    const password = this.formGroup.controls['matKhau'].value;
    
    const confirmPassword = this.formGroup.controls['xacNhanMatKhau'].value;
     if (password != confirmPassword || password == "" || confirmPassword == "") {
        Swal.fire(
          'Failed!',
          'Password not match',
          "error"
          
    
        )
       
        return;
      }
    if(this.formGroup.valid)
    {
     
    Swal.fire({
      title: 'Are you sure?',
      text: "Create new staff",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,create it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.register(this.formGroup.value).subscribe((result) => {

          if (result)
         
          {
            setTimeout(() => {
              Swal.fire(
                'Success!',
                '',
                'success'
                
      
              )
              window.location.reload()
              
            }, 3000);
          }




        }, error => {
 
          
           
            Swal.fire(
              'Fail!',
              error.error.message,
              'error'
              
    
            )
          
        });
      
      
       
         
      
    
       
        
       
        
       
      }

     
    })
  

  
  }
  else {
    Swal.fire(
      'Failed!',
      'You have not entered all the information',
      "error"
      

    )
  }

   


   


  }
  currentstaff(id)
  {

    this.api.getstaff().subscribe(res=>{
          this.data = res
  
        this.array = this.data.data
         for(let i=0;i<this.array.length;i++)
        {
          if(this.array[i].nguoiDungId==id)
          {
          
          this.formGroupchangeinfo = new FormGroup({
            nguoiDungId : new FormControl(this.array[i].nguoiDungId, [Validators.required]),
            tenNguoiDung: new FormControl(this.array[i].tenNguoiDung, [Validators.required]),
            diaChi: new FormControl(this.array[i].diaChi, [Validators.required]),
            sDT: new FormControl(this.array[i].sDT, [Validators.required]),
            email: new FormControl(this.array[i].email, [Validators.required]),
            
            
          });
           return
          }
        }
  
        
    })
    
   
      
  }
  updateinformationstaff()
  {
    if(this.formGroupchangeinfo.valid)
    {
    Swal.fire({
      title: 'Are you sure?',
      text: "Change employee information",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,update it!'
    }).then((result) => {
      if (result.isConfirmed) {
      
      
        this.update(this.formGroupchangeinfo.value).subscribe((result) => {
          setTimeout(() => {
            window.location.reload()
          }, 3000);

         
   
        });
         
      
    
       
        Swal.fire(
          'Success!',
          '',
          'success'
          

        )
       
        
       
      }

     
    })
  

  
  }
  else {
    Swal.fire(
      'Failed!',
      'You have not entered all the information',
      "error"
      

    )
  }

  }

  update(data): Observable<any> {

    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);


    return this.http.put(this.api.apiuser+`AdminsuathongtinNhanVienKhachHang`, data, { headers: headers });
  }

  deletestaff(id) {



    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
 
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete this staff",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.api.apiuser+`xoaNguoiDung/` + id, { headers: headers }).subscribe(res => {
 
        });
        Swal.fire(
          'Success!',
          '',
          'success'

        )
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }


    })






  }
}

