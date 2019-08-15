import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom_bar.component.html',
  styleUrls: ['./bottom_bar.component.css']
})
export class Bottom_barComponent implements OnInit {
 
  links = ['Dashboard','Test Results', 'Test History', 'Time Saved'];
  activeLink = this.links[0];
 
  constructor() { }

  ngOnInit() {
  }

}