import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-layoutadmin',
  templateUrl: './layoutadmin.component.html',
  styleUrls: ['./assets/style.css']
})
export class LayoutadminComponent implements OnInit {
username:any
role:any
staff=false
  constructor(private router:Router) { }

  ngOnInit(): void {
     this.username=localStorage.getItem('userName')
     this.role=localStorage.getItem('role')
     if(this.role=="staff") 
     this.staff=true
     else this.staff=false

  }
  logout(){
   

    localStorage.clear()
    this.router.navigate(['/']);
    
  }
}
