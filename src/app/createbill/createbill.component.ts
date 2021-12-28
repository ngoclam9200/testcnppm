import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray,FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { data } from 'jquery';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-createbill',
  templateUrl: './createbill.component.html',
  styleUrls: ['./createbill.component.css']
})
export class CreatebillComponent implements OnInit {
formGroup: FormGroup
array:any=[]
tmp:any=[]
arr:any
formArray:FormArray
diaChi:any
sDT:any
data:any=[]
  constructor( private http: HttpClient, private api:ApiService, private dialog : MatDialogRef<CreatebillComponent>) { }

  ngOnInit(): void {
    this.getrole()
    this.api.checkadmin()
   

    this.formGroup = new FormGroup({
      danhSachDat: new FormArray(this.array,[Validators.required]),
      diaChiGiaoHang: new FormControl("", [Validators.required]),
      sdtNguoiNhan: new FormControl("", [Validators.required]),
      thanhToanOnline: new FormControl(false, [Validators.required]),
    });
    this.formArray=new FormArray(this.array)
    this.currentphoneaddress()
  }
  currentphoneaddress() {





    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    this.http.get(this.api.apiuser+`xemthongtinnguoidung`, { headers: headers }).subscribe(res=>{
          this.data = res
  
        this.data = this.data.data
    
       this.diaChi = this.data[0].diaChi
      
      this.sDT = this.data[0].sDT
       this.formGroup.controls['sdtNguoiNhan'].setValue(this.data[0].sDT)
      this.formGroup.controls['diaChiGiaoHang'].setValue(this.data[0].diaChi)
      
     
      
  
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
  createbill()
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     const sdt=this.formGroup.controls['sdtNguoiNhan'].value;
     const diaChiGiaoHang=this.formGroup.controls['diaChiGiaoHang'].value;
     var number = "0123456789"
     var checksdt = function (string) {
      for (let i = 0; i < string.length; i++) {
        if (number.indexOf(string[i]) == -1) {
          return true
        }
      }
      return false;
    }
    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\~`-="

    var checkaddress = function (string) {
      for (let i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
          return true
        }
      }
      return false;
    }


    if (checkaddress(diaChiGiaoHang) == true) {

      return alert('Address không hợp lệ');
    }


    if (checksdt(sdt) == true) {

      return alert('Phone number receiver không hợp lệ');
    }



    this.http.get(this.api.apiorder+`xemgiohang`, { headers: headers }).subscribe(res => {
     
      this.tmp=res
      this.tmp=this.tmp.data[0]
       
    
      for(let i=0 ;i<this.tmp.length;i++)
      { 
        var a={sanPhamId: this.tmp[i].sanPhamId, soLuongDat:this.tmp[i].soLuongTrongGio}
        this.array.push(a)

      }
           this.formGroup = new FormGroup({
         danhSachDat: new FormControl(this.formArray.controls),
      
        diaChiGiaoHang: new FormControl(this.formGroup.controls['diaChiGiaoHang'].value, [Validators.required]),
        sdtNguoiNhan: new FormControl(this.formGroup.controls['sdtNguoiNhan'].value, [Validators.required]),
        thanhToanOnline: new FormControl(false, [Validators.required]),
       
      });
      
      if (this.formGroup.valid)
      {
        Swal.fire({
          title: 'Are you sure?',
          text: "Create bill!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes,create bill!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.http.post(this.api.apibill+`taohoadon` ,this.formGroup.value, { headers: headers }).subscribe(res => {
           
              this.tmp=res
            
              
             
          
        
           });
           setTimeout(() => {
             window.location.reload()
           }, 3000);
           
            Swal.fire(
              'Success!',
              '',
              'success'
              
    
            )
          
           
          }
    
    
        })
    

        
      
      }
      else 
      alert("Please fill the form")
    
    });
      this.formArray.setValue(this.array)

        this.formGroup = new FormGroup({
         danhSachDat: new FormControl(this.formArray.controls),
      
        diaChiGiaoHang: new FormControl(this.formGroup.controls['diaChiGiaoHang'].value, [Validators.required]),
        sdtNguoiNhan: new FormControl(this.formGroup.controls['sdtNguoiNhan'].value, [Validators.required]),
        thanhToanOnline: new FormControl(false, [Validators.required]),
       
      });
 
      
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
       headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
      
      



  }
  close()
{
  this.dialog.close()
}

}
