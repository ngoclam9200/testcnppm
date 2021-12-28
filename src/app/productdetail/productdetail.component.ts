import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from '@angular/common'
import {FormControl, Validators} from '@angular/forms';

import { Router } from '@angular/router'

import Swal from 'sweetalert2';
import { ApiService } from 'src/services/api.service';
import { FormGroup } from '@angular/forms';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ImagecomponentComponent } from '../imagecomponent/imagecomponent.component';
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./assets/style.css']
})
export class ProductdetailComponent implements OnInit {
  idproduct: any
  data: any
  datarelate: any
  arrayrelate: any = []
  array: any = []
  arrayid: any = []
  tmparray: any = []
  dataproducttype: any
  arrayproducttype: any = []
  iddetail: any
  arraybooking: any = []
  _id; hinhAnh; tenSP; moTa; giaTien; giamGia ;soLuongConLai  : any

  formGroup:FormGroup
  constructor(private http: HttpClient, private router: Router, private api:ApiService, private dialog:MatDialog) { }
  isLogin: boolean = false
  ngOnInit(): void {
this.getrole()
    this.api.checkadmin()
    // this.api.checkstaff()
    
    this.currentproduct()
    this.getlistproducttype()
    this.getcarrelate()
    this.initForm()
  
    if (localStorage.getItem('currentUser') == null) this.isLogin = false
    else this.isLogin = true

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
  currentproduct() {


    this.idproduct = localStorage.getItem('idproduct')
    

    
    let headers = new HttpHeaders();




    this.http.get(this.api.apiproduct+`laySanPhamById/` + this.idproduct, { headers: headers }).subscribe(res => {
    
      this.data = res
 
      this.hinhAnh = this.data.data.hinhAnh
      this.tenSP = this.data.data.tenSP
      this.giamGia = this.data.data.giamGia
      this.giaTien = this.data.data.giaTien
      this.soLuongConLai=this.data.data.soLuongConLai
      this.moTa=this.data.data.moTa
     
      this._id = this.data.data.loaiSanPhamId
   
     
      












    });



  }
  getlistproducttype() {
    let headers = new HttpHeaders();
  


    this.http.get(this.api.apiproducttype+`laydanhsachLoaiSP`, { headers: headers }).subscribe(res => {
  
      this.dataproducttype = res

      this.arrayproducttype = this.dataproducttype.data
     





    });



  }
  searchproductbyproducttype(idproducttype) {
    localStorage.setItem('idproducttype', idproducttype)
    localStorage.setItem('isproducttype', 'true')
    localStorage.setItem('isproduct', 'false')
    this.router.navigate(['/searchproduct']);
  }


  getcarrelate() {
    






    let headers = new HttpHeaders();
    this.http.get(this.api.apiproduct+`laySanPhamById/` + this.idproduct, { headers: headers }).subscribe(res => {
    
      this.data = res
 

    

      this.http.get(this.api.apiproduct+`laysptheoLoaisanpham/` + this.data.data.loaiSanPhamId, { headers: headers }).subscribe(res => {

        this.datarelate = res
        
  
        this.tmparray = this.datarelate.data
 
        for (let i = 0; i < this.tmparray.length; i++) {
       if(this.tmparray[i].sanPhamId != localStorage.getItem('idproduct'))
          this.arrayrelate.push(this.tmparray[i])
          if (i == 3) break
        }
      
  
  
  
  
  
      });










    });
 

   






  }
  getallrelate() {
    this.idproduct = localStorage.getItem('idproduct')
    

    
    let headers = new HttpHeaders();




    this.http.get(this.api.apiproduct+`laySanPhamById/` + this.idproduct, { headers: headers }).subscribe(res => {
    
      this.data = res
     
     
      localStorage.setItem('idproducttype' , this.data.data.loaiSanPhamId )
   
     
      
 
      localStorage.setItem('isproducttype', 'true')
      localStorage.setItem('isproduct', 'false')
      this.router.navigate(['/searchproduct']);
  











    });

    
  }
  // comparecar() {
   
  //   this.iddetail = localStorage.getItem('idcardetail')
  //   if (localStorage.getItem('arraycomparecar') == null || localStorage.getItem('arraycomparecar') == "") {
  //     localStorage.setItem('arraycomparecar', this.iddetail);

  //     this.router.navigate(['/carcomparison']);

  //   }
  //   else {
  //     this.idcar = localStorage.getItem('arraycomparecar')
  //     if (this.idcar.length > 96) {
  //       Swal.fire({
  //         title: 'comparison list cannot be more than 4 cars ',
  //         text: "you need to delete?",
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Yes'
  //       }).then((result) => {
  //         if (result.isConfirmed) {




  //           this.router.navigate(['/carcomparison']);


  //         }

  //       })

  //     }
  //     else {

  //       var existing = localStorage.getItem('arraycomparecar');
  //       this.idcar = localStorage.getItem('arraycomparecar')
  //       var i = 0
  //       var length = this.idcar //74
  //       var start = 0
  //       var numberstring = Math.floor(length.length / 24)

  //       while (i < numberstring) {

  //         var t = this.idcar.indexOf(",")

  //         if (t == -1) this.arrayid.push(this.idcar)
  //         else this.arrayid.push(this.idcar.slice(start, t))

  //         this.idcar = this.idcar.slice(t + 1, this.idcar.length)


  //         i++;
    

  //       }
  //       for (let i = 0; i < this.arrayid.length; i++) {
  //         if (this.arrayid[i] == this.iddetail) {
  //           Swal.fire({
  //             title: 'This vehicle already exists in the comparison list ',
  //             text: "Do you want to go to the comparison page?",
  //             icon: 'warning',
  //             showCancelButton: true,
  //             confirmButtonColor: '#3085d6',
  //             cancelButtonColor: '#d33',
  //             confirmButtonText: 'Yes'
  //           }).then((result) => {
  //             if (result.isConfirmed) {




  //               this.router.navigate(['/carcomparison']);


  //             }

  //           })

  //           return
  //         }
  //       }

  //       var data
  //       this.iddetail = localStorage.getItem('arraycomparecar')
  //       data = existing ? existing.split(',') : [];


  //       data.push(this.iddetail);


  //       localStorage.setItem('arraycomparecar', data.toString());


  //       this.router.navigate(['/carcomparison']);
  //     }




  //   }





  // }
  initForm(){
    
    this.formGroup= new FormGroup({
      sanPhamId: new FormControl(localStorage.getItem('idproduct'), [Validators.required]),
      soLuong: new FormControl(1,[ Validators.required])
    }); 

  }
  increasing()
  { let soluong= this.formGroup.controls['soLuong'].value
 
  
    soluong=soluong+1
    if(soluong>this.soLuongConLai) {
      Swal.fire({
       
       text: "Số lượng sản phẩm không đủ ",
       icon: 'warning',
      

      })
      soluong=soluong-1
    }
    this.formGroup= new FormGroup({
      sanPhamId: new FormControl(localStorage.getItem('idproduct'), [Validators.required]),
      soLuong: new FormControl(soluong,[ Validators.required])
    }); 
 


 
    
  }
  decreasing()
  {
    let soluong= this.formGroup.controls['soLuong'].value
    if(soluong==1) return 
    soluong=soluong-1 
    this.formGroup= new FormGroup({
      sanPhamId: new FormControl(localStorage.getItem('idproduct'), [Validators.required]),
      soLuong: new FormControl(soluong,[ Validators.required])
    }); 
  


  }


  order() {
    
    
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token

    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    
    Swal.fire({
      title: 'you order this product',
      text: "Are you want to order",
      icon: 'warning',
      showCancelButton: true,
      width: 500,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes,order it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post(this.api.apiorder+`themspvaogiohang`,this.formGroup.value, { headers: headers }).subscribe(res => {

         window.location.reload()
         
         
        
    
         
    
        }, error=>{
         
            Swal.fire({
       
              text: error.error.message,
              icon: 'warning',
             
       
             })

          
         
           

          
        }
        );


        


      }
      else return


    })



  


  }
  openimage(image)
  {
    
    localStorage.setItem('image',image)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='700px';
    // dialogConfig.height='800px';
    dialogConfig.maxHeight='1000px'
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    
      

    this.dialog.open(ImagecomponentComponent, dialogConfig);

  
      
   
   


  
  }
}
