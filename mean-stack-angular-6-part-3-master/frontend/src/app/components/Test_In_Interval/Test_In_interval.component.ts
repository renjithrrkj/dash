import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import {DateRange} from '../date_range/date_range.component';
import {Chart} from 'chart.js';
import {Moment} from 'moment';

//import {ChartDataLabels} from 'chartjs-plugin-datalabels';
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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

      for(var val of TestArr){
       var d= new Date(val["Date"]);
      // var m = d.toString;
       //d.slice(0,10);
       //this.labels.push(d);
       /*var c=val['count'];
       console.log(c);
       var dat =[{t:d,y: c}];
       console.log(dat);
       var k={label:val["Team"],data:dat};
       console.log(k);*/
       

           var colo=getRandomColor();
           console.log(colo);
           this.chartData.push({label:val["Team"],borderColor:colo,backgroundColor:'rgba(0,0,0,0)',pointRadius:5,pointBorderWidth:3,pointHoverRadius:10,/*backgroundColor:colo*/data:[{t:d,y: val["count"]}]});
           console.log(this.chartData);
           for(var i=0;i<this.chartData.length;i++)
           {
                for(var j=i+1;j<this.chartData.length;j++)
                {
                  if(this.chartData[i]['label']==this.chartData[j]['label'])
                  {   
                      
                      this.chartData[i]['data'].push(this.chartData[j]['data'][0]);
                      this.chartData.splice(j,1);
                  }

                }

           }

         
         
       }
      
       
      
   
      console.log(this.chartData);
      console.log(this.selected);
     // this.chartData[1].data=Object.values(TeamsArr[2]);
     // this.chartData[2].data=Object.values(TeamsArr[0]);
    //this.labels= Object.keys(TeamsArr[0]);
    });
  }
  

  ngModelChange(event){
    console.log(this.selected);
  }
  
  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true ,  // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
    title :{ 
      display:true,
      text :'Timeline of tests',
      fontSize:18,
      fontFamily:'Helvetica Neue'
    },
    scales: {
      xAxes: [{
          type: 'time',
          
          time: {
            unit: 'day',
              
          },
         /* ticks:{
            source:'data'
          }*/
          ticks: {
            fontSize: 15,
           min: DateRange.Select()['startDate']['_d'],
           max: DateRange.Select()['endDate']['_d']
           },
          scaleLabel:{
            display:true,
            labelString:"Time",
            fontSize:20,
            fontFamily:"Ariel"
          },
         
      }],
      yAxes:[{
        ticks: {
          fontSize: 15
         },
         scaleLabel:{
          display:true,
        labelString:"Number    of    Tests   Excecuted",
        fontSize:20,
        fontFamily:"Ariel"
        },

      }]
      
  },
  legend: {
    display: true,
    labels: {
        fontColor: 'rgb(1, 2, 1)',
        fontSize:18
    }
  },
  layout: {
    padding: {
        left: 100,
        right: 0,
        top: 0,
        bottom: 0
         }
      },
  tooltips:{
    titleFontSize:20,
    bodyFontSize:20,
    titleFontFamily:'courier',
    bodyFontFamily:'courier'
  }    
  }
   
 labels = [];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData= [{label:'Teams:'}];
    /*{
      label: 'TeamA',
      data: [{
        x: new Date(),
        y: 1
    }, {
        t: new Date(),
        y: 10
    }]
    },
    { 
      label: 'TeamB',

      data: [33,33,11,9,23,98,43]
    },
    {
      label:'Teamc',

      data:[45,1,33,88,76,1,33,99]
    }*/
  
  

  // CHART COLOR.
  colors = [
    { 
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor: 'rgba(0,0,0,0)'
    },
    { 
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