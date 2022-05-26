import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  dataLoaded=false;
  constructor() { }

  ngOnInit(): void {
    this.dataLoaded=true;
  }

}
