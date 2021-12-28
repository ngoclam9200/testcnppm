import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isLogin=false
  username:any
  data:any
  soLuongSanPham:any
  constructor( private router:Router, private http:HttpClient, private api:ApiService) { }

  ngOnInit(): void {
    this.api.checkadmin()
    this.api.checkstaff()
    this.currentnumberproductcart()
  
   
  
    if(localStorage.getItem('currentUser') !=null)
    {
      this.isLogin=true
       this.username=localStorage.getItem('userName')
     
    }
  }
  logout(){
   
 
    localStorage.clear()
    this.router.navigate(['/']);
    return this.isLogin=false
  }
  currentnumberproductcart() {
    if(localStorage.getItem('currentUser') !=null)
    {
     
     
    





    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apiorder+`xemgiohang`, { headers: headers }).subscribe(res => {
       this.data = res
       this.data=this.data.data
       this.data=this.data[0]
      
       this.soLuongSanPham=this.data.length
    

    


    });


  }
  
}


}


