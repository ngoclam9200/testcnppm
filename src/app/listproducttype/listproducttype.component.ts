import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from '@angular/common'

import { Router } from '@angular/router'

import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-listproducttype',
  templateUrl: './listproducttype.component.html',
  styleUrls: ['./assets/style.css']
})
export class ListproducttypeComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private api:ApiService) { }
  data: any
  array: any = []
isLogin=false
  ngOnInit(): void {
    this.getrole()
    this.api.checkadmin()
    // this.api.checkstaff()
    this.getproducttype()
    if(localStorage.getItem('currentUser')!=null) this.isLogin=true
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
  getproducttype() {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apiproducttype+`laydanhsachLoaiSP`, { headers: headers }).subscribe(res => {
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

}
