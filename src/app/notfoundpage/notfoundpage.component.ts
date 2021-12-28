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
  selector: 'app-notfoundpage',
  templateUrl: './notfoundpage.component.html',
  styleUrls: ['./notfoundpage.component.css']
})
export class NotfoundpageComponent implements OnInit {
pagename:any="home"
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.pagename=localStorage.getItem('currentpage1')
   
    localStorage.removeItem('currentpage1')
    localStorage.removeItem('currentpage2')
    setTimeout(() => {
      this.router.navigate(['/'+this.pagename]);
    }, 3000);

    
   
  }
  nextpage()
  {
    this.router.navigate(['/'+this.pagename]);
  }
  

}
