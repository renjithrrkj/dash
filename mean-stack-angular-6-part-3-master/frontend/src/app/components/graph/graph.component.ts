import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  title = 'Test pass-fail chart  ';

  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  labels =  ['TeamA', 'TeamB', 'TeamC', 'TeamD', 'TeamE', 'TeamF', 'TeamG', 'TeamH', 'TeamI', 'TeamJ', 'TeamK', 'TeamL'];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
    {
      label: 'pass',
      data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
    },
    { 
      label: 'fail',
      data: [-33, -9, -28, -54, -77, -51, -24,-33,-12,-23,-44]
    }
  ];

  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(22,700,2,0.4)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(2000, 19, 22, 0.8)'
    }
  ]
  
  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }

}