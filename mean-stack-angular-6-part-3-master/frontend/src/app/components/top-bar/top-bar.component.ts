import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  links = ['graph', 'Test_Interval', 'Third'];
  activeLink = this.links[0];
 

  constructor() { }

  ngOnInit() {
  }

}