import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { } from '@angular/common'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router'

import * as XLSX from 'xlsx';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-allcustommer',
  templateUrl: './allcustommer.component.html',
  styleUrls: ['./allcustommer.component.css']
})
export class AllcustommerComponent implements OnInit {

  array: any = []
  data: any
  arrayalluser: any = []
  checkfillImage; checkfillcarName; checkfillCarInformation; checkfillairBag; checkfillbody; checkfillcarLife; checkfillcolour; checkfillcompanyName; checkfillengineType; checkfillfrontBrake; checkfillfuelConsumption; checkfillgear; checkfilllongs; checkfillnumberOfSeats; checkfillorigin; checkfilloverallSize; checkfillprice; checkfillseat; checkfillstatus; checkfilltireParameters; checkfilltopSpeed; checkfillwattage; checkfillyearOfManufacture: boolean = false

  formGroup: FormGroup
  @ViewChild('TABLE') TABLE: ElementRef;
  ExportTOExcel() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toLocaleDateString();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'AllCustommer' + today + '.xlsx');
  }
  constructor(private http: HttpClient, private router: Router,private api:ApiService) { }

  ngOnInit(): void {
    this.getrole()
    this.api.checkuser()
    this.api.checkRole()
    this.api.checkstaff()
    this.getcustommer()
  }
  getrole()
  {
  
   
    var str=this.constructor.name
    str=str.toLowerCase()
    var a=str.search('component')
    str=str.slice(0,a)
    if(localStorage.getItem('role')=="customer"|| localStorage.getItem('role')=="staff") localStorage.setItem('currentpage2',str)
    else
    localStorage.setItem('currentpage1',str)
  }
  getcustommer() {
    
  this.api.getcustommer().subscribe(res=>{
        this.data = res

      this.array = this.data.data
    

      // for (let i = 0; i < this.array.length; i++) {
      //   if (this.array[i].role == "USER")
      //     this.arrayalluser.push(this.array[i])
      // }
  })
 
  

  }


}
