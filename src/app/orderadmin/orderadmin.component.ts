import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from '@angular/common'
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { FormGroup } from '@angular/forms';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { BilldetailComponent } from '../billdetail/billdetail.component';
@Component({
  selector: 'app-orderadmin',
  templateUrl: './orderadmin.component.html',
  styleUrls: ['./orderadmin.component.css']
})
export class OrderadminComponent implements OnInit {
  data: any
  array: any = []
  @ViewChild('TABLE') TABLE: ElementRef;
  title = 'Excel';
  nobill=true
  formGroup:FormGroup
  waitconfirm=true
  delevering=true
  delevered=true
  cancle=true
 

  myDate: any
  ExportTOExcel() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toLocaleDateString();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    if(localStorage.getItem('trangThaiGiaoHangId')=="1"){
      XLSX.writeFile(wb, 'Order_Wait_Confirm_Sheet' + today + '.xlsx');
    }
    if(localStorage.getItem('trangThaiGiaoHangId')=="3"){
      XLSX.writeFile(wb, 'Order_Delevering_Sheet' + today + '.xlsx');
    }
    if(localStorage.getItem('trangThaiGiaoHangId')=="4"){
      XLSX.writeFile(wb, 'Order_Receivered_Sheet' + today + '.xlsx');
    }
    if(localStorage.getItem('trangThaiGiaoHangId')=="5"){
      XLSX.writeFile(wb, 'Order_Cancle_Sheet' + today + '.xlsx');
    }

   
  }
  constructor(private http: HttpClient, private router: Router, private api:ApiService, private dialog : MatDialog) {

  }

  ngOnInit(): void {
    this.getrole()
    this.api.checkuser()
    // this.api.checkstaff()
    this.api.checkRole()
    this.bill(1)
    
    }
    getrole()
    {
    
     
      var str=this.constructor.name
      str=str.toLowerCase()
      var a=str.search('component')
      str=str.slice(0,a)
      if(localStorage.getItem('role')=="customer") localStorage.setItem('currentpage2',str)
      else
      localStorage.setItem('currentpage1',str)
    }
    bill(id) {
      localStorage.setItem("trangThaiGiaoHangId",id)
      if(localStorage.getItem('trangThaiGiaoHangId')=="1")
      {
        this.waitconfirm=true
        this.delevered=false
        this.delevering=false
        this.cancle=false
      
      }
      if(localStorage.getItem('trangThaiGiaoHangId')=="3")
      {
        this.waitconfirm=false
        this.delevered=false
        this.delevering=true
        this.cancle=false
      }
      if(localStorage.getItem('trangThaiGiaoHangId')=="4")
      {
        this.waitconfirm=false
        this.delevered=true
        this.delevering=false
        this.cancle=false
      }
      if(localStorage.getItem('trangThaiGiaoHangId')=="5")
      {
        this.waitconfirm=false
        this.delevered=true
        this.delevering=false
        this.cancle=true
      }
   


      
  
  
      let headers = new HttpHeaders();
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
       headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  
  
  
      this.http.get(this.api.apibill+`Xemhoadontheotrangthaiadmin/`+id, { headers: headers }).subscribe(res => {
         this.data = res
          this.data=this.data.data
       
         
         if(this.data.length==0) this.nobill=true
         else 
         {
           this.nobill=false
      
         }
  
  
  
      }, error=>{
     
        this.nobill=true
      });
  
  
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
      
        
  
      this.dialog.open(BilldetailComponent, dialogConfig);
        
     
     
  
  
    
    }
 updatestatus(id,status)
 {
   var text
   if(status==5) text="Delete"
   if(status==3 || status==4) text="Confirm"

  let headers = new HttpHeaders();
  var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  var token = currentUser.token; // your token
   headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
   Swal.fire({
    title: 'Are you sure?',
    text: text+ " this bill",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes,'+text+' it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.http.put(this.api.apibill+`capnhattrangthaidonAdmin/`,{"hoaDonId":id,"trangThaiGiaoHangId":status}, { headers: headers }).subscribe(res => {
     
         this.bill(localStorage.getItem('hoaDonId'))
       
   
     }, error=>{
    
       this.nobill=true
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
