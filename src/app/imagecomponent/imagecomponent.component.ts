import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imagecomponent',
  templateUrl: './imagecomponent.component.html',
  styleUrls: ['./imagecomponent.component.css']
})
export class ImagecomponentComponent implements OnInit {
image:any;
  constructor() { }

  ngOnInit(): void {
    this.image=localStorage.getItem('image')
  }
 
}
