import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private issueService: IssueService) { }
  //TeamsArr: object;
  
  ngOnInit() {
    this.issueService.getPass_Per_Team().subscribe((TeamsArr) => {
      console.log(TeamsArr);
      this.chartData[0].data=Object.values(TeamsArr[1]);
      this.chartData[1].data=Object.values(TeamsArr[2]);
      this.chartData[2].data=Object.values(TeamsArr[0]);
    this.labels= Object.keys(TeamsArr[0]);
    });
  }

  
  title = 'Test pass-fail chart  ';

  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }
   
  labels = [];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData=[] = [
    {
      label: 'pass',
      data:[]
    },
    { 
      label: 'fail',

      data: []
    },
    {
      label:'Toatal',
      data:[]
      
    }
  
  ];

  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(22,1400,100,0.8)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(2000, 19, 22, 0.8)'
    },
    {
      backgroundColor: 'rgba(20, 19, 200, 0.8)'
    }
  ]
  
  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }
}