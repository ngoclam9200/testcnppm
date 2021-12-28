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
import { BilldetailComponent } from '../billdetail/billdetail.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
data:any=[]
nobill=true
remove=false
p:number=1
  constructor(private http:HttpClient, private api:ApiService, private dialog : MatDialog) { }


  ngOnInit(): void {
    this.getrole()
    this.api.checkadmin()
    this.api.checkRole()
    this.allbill()
    // this.api.checkstaff()
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
  allbill() {
   


    this.remove=false


    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apibill+`danhsachhoadonNguoiDung`, { headers: headers }).subscribe(res => {
       this.data = res
       this.data=this.data.data
     
       
       if(this.data,length==0) this.nobill=false
       else 
       {this.nobill=false
      
      
       }













    });


  }
  statusorder(id)
  {
    if(id==1) this.remove=true 
    else this.remove=false
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apibill+`Xemhoadontheotrangthaicuanguoidung/`+id, { headers: headers }).subscribe(res => {
       this.data = res
       this.data=this.data.data
     
       
       if(this.data,length==0) this.nobill=false
       else 
       {this.nobill=false
      
      
       }













    }, error=>{
     
      this.nobill=true
    });
    ;

  }
  deletebill(id)
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     var a={}
     Swal.fire({
      title: 'Are you sure?',
      text: "Remove bill!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,remove bill!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.put(this.api.apibill+`nguoidunghuydonhang/` +id,a, { headers: headers }).subscribe(res => {
           this.statusorder(1)
          
         
      
    
       });
      
       
        Swal.fire(
          'Success!',
          '',
          'success'
          

        )
      
       
      }


    })
    

  }
  openbilldetail(id)
  {
    
    localStorage.setItem('hoaDonId',id)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='600px';
    // dialogConfig.height='800px';
    dialogConfig.maxHeight='1000px'
    dialogConfig.disableClose=false;
    
      

    this.dialog.open(BilldetailComponent, dialogConfig);
      
   
   


  
  }

}
