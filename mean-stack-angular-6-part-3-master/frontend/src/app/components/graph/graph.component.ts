import { Component, OnInit,ViewChild } from '@angular/core';

import { IssueService } from '../../issue.service';
import { Chart, ChartOptions } from 'chart.js';
import * as ChartLabel from 'chartjs-plugin-datalabels';
import * as data from './avoided.json';



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
      var val  ;
      console.log(data['default']);
      for(val of Object.values(data['default']))
       {
        if( Object.keys(TeamsArr[0]).indexOf(val))
         {
           console.log(val);
          delete TeamsArr[0][val];
          delete TeamsArr[1][val];
          delete TeamsArr[2][val];
          console.log(TeamsArr);
          
         }
       }
      this.chartData[0].data=Object.values(TeamsArr[1]);
      this.chartData[1].data=Object.values(TeamsArr[2]);
      this.chartData[2].data=Object.values(TeamsArr[0]);
    this.labels= Object.keys(TeamsArr[0]);
     
    });
  }

  
  //title = 'Test pass-fail chart  ';

  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true  ,  // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
    defaultFontSize	: 20,
    scales: {
      xAxes: [{
          barPercentage: 0.7,
          maxBarThickness: 45,
          minBarLength: 2,
          gridLines: {
              offsetGridLines: true
          },
          ticks: {
            fontSize: 11
           },
           scaleLabel:{
            display:true,
          labelString:"Teams",
          fontSize:11,
          fontFamily:"Ariel"
          
          },
                  
      }],
      yAxes:[{
        display:true,
        scaleLabel:{
          display:true,
        labelString:"Number of latest Tests",
        fontSize:11,
        fontFamily:"Ariel"
        },
        fontSize:24,
        ticks: {
          fontSize: 11
         }
      }]
      
    },
  title: {
    display: true,
    text:'Test pass-fail chart',
    fontSize:14,
    fontColor:'#000000'

   },
  tooltips:{
  titleFontSize:20,
  bodyFontSize:20,
  titleFontFamily:'courier',
  bodyFontFamily:'courier'
   }, 
  legend: {
    display: true,
    labels: {
      fontColor: 'rgb(1, 2, 1)',
      fontSize:12
  }
},
layout: {
  padding: {
      left: 40,
      right: 40,
      top: 0,
      bottom: 0
  }
 

  },
  axisX:{
    labelFontSize: 15,
  }
}
   
//labels is teamname 
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
      label:'Total',
      data:[]
      
    }
  
  ];

  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(22,400,100,0.3)',
      hoverBackgroundColor:'rgba(22,400,100,0.9)',
      borderColor:'rgba(22,400,100,0.9)',
      borderWidth:1
    
    },
    { // 2nd Year.
      backgroundColor: 'rgba(2000, 19, 22, 0.3)',
      hoverBackgroundColor:'rgba(2000, 19, 22, 0.9)',
      borderColor:'rgba(2000, 19, 22, 0.9)',
      borderWidth:1
      
    },
    {
      backgroundColor: 'rgba(5, 19, 300, 0.3)',
      hoverBackgroundColor:'rgba(5, 19, 300, 0.9)',
      borderColor:'rgba(5, 19, 300, 0.9)',
      borderWidth:1
    }
  ]
  
  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }
}
