import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators , FormArray} from '@angular/forms';
import {} from "jquery";
import { MatDialog,MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CreatebillComponent } from '../createbill/createbill.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-billdetail',
  templateUrl: './billdetail.component.html',
  styleUrls: ['./billdetail.component.css']
})
export class BilldetailComponent implements OnInit {
data:any=[]
alldata:any=[]
p: number = 1;
diaChiGiaoHang;sdtNguoiNhan;trangThaiGiaoHang;daThanhToan;tongHoaDon;ngayXuatDon:any
  constructor(private http:HttpClient, private api:ApiService, private dialog : MatDialogRef<BilldetailComponent>) { }

  ngOnInit(): void {
    
    this.billdetail( localStorage.getItem('hoaDonId'))
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
  billdetail(id)
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     var a={}
     this.http.get(this.api.apibill+`xemchitiethoadon/` +id, { headers: headers }).subscribe(res => {
       this.data=res
      this.alldata=res
      this.data=this.data.data
      this.data=this.data[0].chiTietHD
      this.alldata=this.alldata.data
      this.tongHoaDon=this.alldata[0].tongHoaDon
      this.diaChiGiaoHang=this.alldata[0].diaChiGiaoHang
      this.sdtNguoiNhan=this.alldata[0].sdtNguoiNhan
      this.daThanhToan=this.alldata[0].daThanhToan
      if(this.daThanhToan==false) this.daThanhToan="No"
      this.trangThaiGiaoHang=this.alldata[0].trangThaiGiaoHangId
      if(this.trangThaiGiaoHang=="1") this.trangThaiGiaoHang="Wait for confirming"
      if(this.trangThaiGiaoHang=="3") this.trangThaiGiaoHang="Delevering"
      if(this.trangThaiGiaoHang=="4") this.trangThaiGiaoHang="Receivered"
      if(this.trangThaiGiaoHang=="5") this.trangThaiGiaoHang="Canceled"
      this.ngayXuatDon=this.alldata[0].ngayXuatDon
      
      
 
      
     
  

   });
  }
close()
{
  this.dialog.close()
}
}
