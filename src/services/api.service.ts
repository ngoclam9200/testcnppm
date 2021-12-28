import { Injectable } from '@angular/core';

import {  HttpClient, HttpHeaders, } from '@angular/common/http';
import { } from '@angular/common'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  array: any = []
  data: any
  tmp:any
  arrayalluser: any = []
  constructor(private http:HttpClient, private router:Router) { }
 
 
  apiabout="https://carshop985.herokuapp.com/api/about/"
  apiuser="https://webbanhangapitienlam.azurewebsites.net/api/Users/"
 
  apiproduct="https://webbanhangapitienlam.azurewebsites.net/api/SanPham/"
  apiproducttype="https://webbanhangapitienlam.azurewebsites.net/api/LoaiSanPham/"
 
 
  apiorder="https://webbanhangapitienlam.azurewebsites.net/api/GioHang/"
  apibill="https://webbanhangapitienlam.azurewebsites.net/api/HoaDon/"

  getstaff() {
    
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiuser+`laydanhsachNhanVien`, { headers: headers })
  }
  getcustommer() {
    
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiuser+`laydanhsachKhachHang`, { headers: headers })
  }
  checkRole()
  {
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate(['/']);
      return

    }
     if(localStorage.getItem('role')==null)
     {
      this.router.navigate(['/']);
      return
     }
     
   

    
  }
  checkstaff()
  {
    if(localStorage.getItem('role')=="staff")
    {
    this.router.navigate(['/notfoundpage']);
   
    }
  }
    checkadmin()
  {
  
    if(localStorage.getItem('role')=="admin")
   
     {//localStorage.setItem('tmp', this.tmp)
     //  localStorage.removeItem('currentUser')
    this.router.navigate(['/notfoundpage']);

     }
  }
  checkuser()
  {
    if(localStorage.getItem('role')=="customer")
     {
      //  localStorage.removeItem('currentUser')
    this.router.navigate(['/notfoundpage']);
   
     }
  }

}
