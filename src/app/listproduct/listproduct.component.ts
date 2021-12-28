import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { } from '@angular/common'

import { Router } from '@angular/router'
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./assets/style.css'],
})
export class ListproductComponent implements OnInit {
  array: any = []
  data: any
  dataproducttype: any
  arrayproducttype: any = []
  formGroupSearch: FormGroup
  arraycomparecar: any = []
  isLogin: boolean
  idcar: any
  arrayid: any = []
  arraybooking:any=[]
  p: number = 1;
  constructor(private http: HttpClient, private router: Router, private formBuider: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.getrole()
    this.api.checkadmin()
    // this.api.checkstaff()
    if (localStorage.getItem('currentUser') == null) this.isLogin = false
    else this.isLogin = true
    this.getproduct()
   
    this.getlistproducttype()
    this.formGroupSearch = this.formBuider.group(
      {
        textSearch: new FormControl("", [Validators.required]),
      }
    )
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
  getproduct() {






    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
 


    this.http.get(this.api.apiproduct+`laydanhsachSP`, { headers: headers }).subscribe(res => {
     this.data = res

      this.array = this.data.data
      
 


    });



  }
  getlistproducttype() {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token




    this.http.get(this.api.apiproducttype+`laydanhsachLoaiSP`, { headers: headers }).subscribe(res => {
       this.dataproducttype = res

      this.arrayproducttype= this.dataproducttype.data
 




    });



  }
  currentproduct(id) {
 
    localStorage.setItem('idproduct', id)
    this.router.navigate(['/productdetail']);

  }
  searchproduct() {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
 


    this.http.get(this.api.apiproduct+`timkiemsanphamtheoten/`+ this.formGroupSearch.controls['textSearch'].value, { headers: headers }).subscribe(res => {
     this.data = res

      this.array = this.data.data
      
 


    });
    
   
  }
  searchproductbyid(id) {
    localStorage.setItem('idproducttype', id)
    localStorage.setItem('isproducttype', 'true')
    localStorage.setItem('isproduct', 'false')
    this.router.navigate(['/searchproduct']);
  }




  allproduct()
  {
    window.location.reload()
  }
}
