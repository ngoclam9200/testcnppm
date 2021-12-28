import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from '@angular/common'
import { Router } from '@angular/router'
import Chart from 'chart.js/auto';
import { ApiService } from 'src/services/api.service';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  data: any
  array: any = []
  arraymonth: any = []
 formGroup:FormGroup
 rechart=false

  arraynumberofbills: any = []

  newarraystatus: any = []

  arraynumberofstatusbill:any= []
  arraybackgroundcolor: any = []
  year:any=[]

  constructor(private http: HttpClient, private router: Router, private api: ApiService) { }
  ngOnInit(): void {
    this.getrole()
    this.api.checkuser()
    this.api.checkRole()
    // this.api.checkstaff()
   
    this.statisticsorder()
    this.statisticsbill()
    this.year=[2021,2022,2023,2024,2025]
    this.formGroup= new FormGroup({
      year: new FormControl("", [Validators.required]),
     
    }); 
    

  }
  getrole()
  {
  
   
    var str=this.constructor.name
    str=str.toLowerCase()
    var a=str.search('component')
    str=str.slice(0,a)
    if(localStorage.getItem('role')=="customer" || localStorage.getItem('role')=="staff") localStorage.setItem('currentpage2',str)
    else
    localStorage.setItem('currentpage1',str)
  }
  changeyearstatictis()
  {
    if(this.formGroup.valid)
    { localStorage.setItem('year',this.formGroup.controls['year'].value)
    window.location.reload()
     
    }
   
    
    else 
      
    Swal.fire(
      'Fail!',
      'You have not selected the year',
      'warning'

    )
  }





  statisticsorder() {
    var year=localStorage.getItem('year')
    if(year==null) year="2021"






    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apibill + `thongkedoanhthutheothang/`+year, { headers: headers }).subscribe(res => {

      this.data = res
      this.array = this.data.data
    
      for(let i=0 ;i<this.array.length;i++)
      {
      this.arraymonth.push(this.array[i].thang)
      this.arraynumberofbills.push(this.array[i].tongDoanhThu)
      }



      const myChart = new Chart("myChart", {

        type: 'line',
        data: {

          labels: this.arraymonth,
          datasets: [{
            label: 'Revenue per month of ' + localStorage.getItem('year'),

            data: this.arraynumberofbills,


            fill: false,
            borderColor: '#82C0E7',
            tension: 0.1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Revenue per month',
              align: 'center',

              position: 'bottom'

            }
          }
        }

      });
      



    });



  }

  statisticsbill() {

    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);

     
      
  
        
            this.http.get(this.api.apibill + `thongketrangthaidonhang`, { headers: headers }).subscribe(res => {

          this.data = res
     
          this.array = this.data.data
   
          for(let i=0 ;i<this.array.length;i++)
          this.arraynumberofstatusbill.push(this.array[i].soLuongHoaDon)
          
        
          
          var a=[1,1,2,4]
       
          if(this.arraynumberofstatusbill.length==1)
          this.newarraystatus=["Wait for confirming "]
          if(this.arraynumberofstatusbill.length==2)
          this.newarraystatus=["Wait for confirming ", "Delevering"]
          if(this.arraynumberofstatusbill.length==3)
          this.newarraystatus=["Wait for confirming ", "Delevering", "Delevered"]
         else  this.newarraystatus=["Wait for confirming ", "Delevering", "Delevered", "Cancel"]
        
           this.arraybackgroundcolor=["red","green","pink","yellow"]
          const myChart = new Chart("myChartcompany", {
      
            type: 'pie',
            data: {
      
              labels: this.newarraystatus,
              datasets: [{
                label: 'Number of bookings',
      
                data: this.arraynumberofstatusbill,
      
      
                backgroundColor: this.arraybackgroundcolor,
                borderColor: '#82C0E7',
      
              }]
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Number of bills by status',
                  align: 'center',
      
                  position: 'bottom'
      
                }
              }
            },
      
      
          });
      
      
      
          }
          
         
          
          
          
          
        
     
  
  
  
  
  
  
        
        
        );

        
    
        

        
      


      
    
   
    
   

    
    
   
    
  }


}
