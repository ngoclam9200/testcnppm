import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from '@angular/common'

import { Router } from '@angular/router'
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-searchproduct',
  templateUrl: './searchproduct.component.html',
  styleUrls: ['./assets/style.css']
})
export class SearchproductComponent implements OnInit {
  data: any
  array: any = []
  dataproducttype: any
  arrayproducttype: any = []
  nameCompany; nameCar: any
  idcar: any
  arrayid: any = []
  arraybooking: any = []
  nocar: boolean = false
  idproducttype:any
  constructor(private http: HttpClient, private router: Router, private api:ApiService) { }
  isLogin: boolean
  ngOnInit(): void {
this.getrole()
    this.api.checkadmin()
    // this.api.checkstaff()
    if (localStorage.getItem('currentUser') == null) this.isLogin = false
    else this.isLogin = true
    this.getproduct()
    this.getlistcompanyname()
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
  getlistcompanyname() {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
 


    this.http.get(this.api.apiproducttype+`laydanhsachLoaiSP`, { headers: headers }).subscribe(res => {
       this.dataproducttype = res

      this.arrayproducttype = this.dataproducttype.data





    });



  }
  getproduct() {






    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
 
    if (localStorage.getItem('isproducttype') == "true") {


      this.idproducttype = localStorage.getItem('idproducttype');
   
       this.http.get(this.api.apiproduct+`laysptheoLoaisanpham/` + this.idproducttype, { headers: headers }).subscribe(res => {
        
         this.data = res

        this.array = this.data.data
    
         if (this.array.length == 0) this.nocar = true



      });


    }
    // if (localStorage.getItem('iscar') == "true") {


    //   this.nameCar = localStorage.getItem('nameCar');
    //    this.http.get(this.api.apicar+`car_name?search=` + this.nameCar, { headers: headers }).subscribe(res => {
    //      this.data = res

    //     this.array = this.data.data
    //      if (this.array.length == 0) this.nocar = true



    //   });


    // }


  }
  currentproduct(id) {
 
    localStorage.setItem('idproduct', id)
    this.router.navigate(['/productdetail']);

  }
  searchproductbyid(id) {
    localStorage.setItem('idproducttype', id)
    localStorage.setItem('isproducttype', 'true')
    localStorage.setItem('isproduct', 'false')
    window.location.reload()
  }


  comparecar(id) {
     if (localStorage.getItem('arraycomparecar') == null || localStorage.getItem('arraycomparecar') == "") {
      localStorage.setItem('arraycomparecar', id);
      this.router.navigate(['/carcomparison']);
    }
    else {
      this.idcar = localStorage.getItem('arraycomparecar')
      if (this.idcar.length > 96) {
        Swal.fire({
          title: 'comparison list cannot be more than 4 cars ',
          text: "you need to delete?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {




            this.router.navigate(['/carcomparison']);


          }

        })
      }
      else {

        var existing = localStorage.getItem('arraycomparecar');
        this.idcar = localStorage.getItem('arraycomparecar')
        var i = 0
        var length = this.idcar //74
        var start = 0
        var numberstring = Math.floor(length.length / 24)

        while (i < numberstring) {

          var t = this.idcar.indexOf(",")
           if (t == -1) this.arrayid.push(this.idcar)
          else this.arrayid.push(this.idcar.slice(start, t))

          this.idcar = this.idcar.slice(t + 1, this.idcar.length)


          i++;
 
        }
        for (let i = 0; i < this.arrayid.length; i++) {
          if (this.arrayid[i] == id) {
            Swal.fire({
              title: 'This vehicle already exists in the comparison list ',
              text: "Do you want to go to the comparison page?",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes'
            }).then((result) => {
              if (result.isConfirmed) {




                this.router.navigate(['/carcomparison']);


              }

            })

            return
          }
        }

        var data

        data = existing ? existing.split(',') : [];


        data.push(id);


        localStorage.setItem('arraycomparecar', data.toString());


        this.router.navigate(['/carcomparison']);
      }




    }





  }
  
}
