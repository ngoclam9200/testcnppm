import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {} from '@angular/common'
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
data:any
array:any=[]
tmparray:any=[]
usenum:any=[]
  constructor(private http:HttpClient, private api:ApiService) { }

  ngOnInit(): void {
 

    // this.getrole()
    // this.api.checkadmin()
    // this.api.checkstaff()
    this.getcar()
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
  getcar()
  {
  


    
    
   
      let headers = new HttpHeaders();
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
      // headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  
  
  
      this.http.get(this.api.apiproduct+`laydanhsachSP`, { headers: headers }).subscribe(res => {
       
        this.data=res

        this.tmparray=this.data.data
        var t1,t2,t3
      
        if(this.tmparray.length>3)
      
       { 
         t1=Math.floor(Math.random()* this.tmparray.length )
         t2=t1
         t3=t1
     while(t2==t1)
     {
         t2=Math.floor(Math.random()* this.tmparray.length )
     } 
     while(t3==t1 || t2==t3)
     {
         t3=Math.floor(Math.random()* this.tmparray.length )
     }
        this.array.push(this.tmparray[t1])
        this.array.push(this.tmparray[t2])
        this.array.push(this.tmparray[t3])
         

       }
       else this.array=this.tmparray
    
    
  
      });
  
  
    
  }

}
