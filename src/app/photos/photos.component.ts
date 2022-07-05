import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  bsmntDirPath : string = "/src/assets/bsmnt/Photos-001 (1)";
  apt1DirPath : string = "/src/assets/1/Photos-001 (1)";
  apt2DirPath : string = "/src/assets/2/Photos-001";
  bsmntPhotos : any;
  apt1Photos : any;
  apt2Photos : any;
  numbers1;
  numbers2;
  numbers3;
 
  constructor() { 
    this.loadImages();
    this.numbers1 = Array(9).fill(0).map((x,i)=>i);
    this.numbers2 = Array(5).fill(0).map((x,i)=>i);
    this.numbers3 = Array(2).fill(0).map((x,i)=>i);
   }

  ngOnInit(): void {
  }

  loadImages(){
  } 

}
