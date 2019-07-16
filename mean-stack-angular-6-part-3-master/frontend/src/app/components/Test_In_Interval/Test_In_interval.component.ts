import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';

@Component({
  selector: 'Test_Interval',
  templateUrl: './Test_In_Interval.component.html',
  styleUrls: ['./Test_In_interval.component.css']
})
export class Test_In_IntervalComponent implements OnInit {

  constructor(private issueService: IssueService) { }
  //TeamsArr: object;
  
  ngOnInit() {
    this.issueService.get_Test_History().subscribe((TestArr) => {
      console.log(TestArr); 
      for(var i=0;i<15;i++){
        var d= new Date(TestArr[i]["_id"]["Sub"]);
      this.labels.push(d);}
      /*this.labels.push(new Date(TestArr[1]["_id"]["Sub"]).slice(0,10));
      this.labels.push( new Date(TestArr[2]["_id"]["Sub"]).slice(0,10));
      this.labels.push(new Date(TestArr[3]["_id"]["Sub"]).slice(0,10));
      this.labels.push(new Date(TestArr[4]["_id"]["Sub"]).slice(0,10));
      this.labels.push(new Date(TestArr[5]["_id"]["Sub"]).slice(0,10));*/



           // this.chartData[0].data=Object.values(TeamsArr[1]);
     // this.chartData[1].data=Object.values(TeamsArr[2]);
     // this.chartData[2].data=Object.values(TeamsArr[0]);
    //this.labels= Object.keys(TeamsArr[0]);
    });
  }

  
  title = 'Timeline of tests';

  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }
   
 labels = [];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData= [
    {
      label: 'TeamA',
      data:[33,44,55,77,88,17]
    },
    { 
      label: 'TeamB',

      data: [33,33,11,9,23,98,43]
    },
    {
      label:'Toatal',

      data:[45,1,33,88,76,1,33,99]
    }
  
  ];

  // CHART COLOR.
  colors = [
    { // TeamA.
      borderColor: 'rgba(22,1400,100,0.8)',
      backgroundColor: 'rgba(0,10,0,0.0)'
    },
    { // TeamB.
      borderColor: 'rgba(2000, 19, 22, 0.8)',
      backgroundColor: 'rgba(10,0,0,0.0)'
    },
    {
      borderColor: 'rgba(20, 19, 200, 0.8)',
      backgroundColor: 'rgba(0,0,0,0.0)'
    }
  ]
  
  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }
}