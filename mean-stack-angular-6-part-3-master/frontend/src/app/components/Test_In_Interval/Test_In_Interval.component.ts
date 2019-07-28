import { Component, OnInit,ViewChild } from '@angular/core';
import { IssueService } from '../../issue.service';
import { BaseChartDirective } from 'ng2-charts';
import {Chart} from 'chart.js';
import { Moment } from 'moment';
//import { DateRange } from '../date_range/date_range.component';
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
  styleUrls: ['./Test_In_Interval.component.css']
})

export class Test_In_IntervalComponent implements OnInit {

  constructor(private issueService: IssueService,/*private daterange:DateRange*/) { }
  @ViewChild(BaseChartDirective,{ static: true }) public chart: BaseChartDirective;
  //TeamsArr: object;

    Arr:Array<any>;
  ngOnInit() {
    this.issueService.get_Test_History().subscribe((TestArr) => {
      
      
      this.Arr=TestArr as Array<any>;
      console.log(this.Arr); 
      
      for(var val of this.Arr){      
       var d= new Date(val["Date"]);
       //var s =new Date(1555200000000);
       
       console.log(d);
      // var m = d.toString;
       //d.slice(0,10);
       //this.labels.push(d);
       /*var c=val['count'];
       console.log(c);
       var dat =[{t:d,y: c}];
       console.log(dat);
       var k={label:val["Team"],data:dat};
       console.log(k);*/
       

           var col=getRandomColor();
           console.log(col);
           this.chartData.push({label:val["Team"],borderColor:col,backgroundColor:'rgba(0,0,0,0)',pointRadius:5,pointBorderWidth:3,pointHoverRadius:10,/*backgroundColor:colo*/data:[{t:d,y: val["count"]}]});

           
           console.log(this.chartData);
           for(var i=0;i<this.chartData.length;i++)
           {
                for(var j=i+1;j<this.chartData.length;j++)
                {
                  if(this.chartData[i]['label']==this.chartData[j]['label'])
                  {   
                      
                      this.chartData[i]['data'].push(this.chartData[j]['data'][0]);
                      this.chartData.splice(j,1);
                      j=j-1;
                  }

                }

           }

         
         
       }
       
      
      

      console.log(this.chartData);
     // this.chartData[1].data=Object.values(TeamsArr[2]);
     // this.chartData[2].data=Object.values(TeamsArr[0]);
    //this.labels= Object.keys(TeamsArr[0]);
    });
  }
  

  selectedStartDate= new Date(1555200000000);
  selectedEndDate= new Date();

  TimeScale ='day';
  
  
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
           min: this.selectedStartDate,           
           max: this.selectedEndDate
              
          },
         /* ticks:{
            source:'data'
          }*/
          ticks: {
            fontSize: 15,
            
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
        left: 10,
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
  chartData= [{label:'Teams:',borderColor:'rgba(0,0,0,0)',backgroundColor:'rgba(0,0,0,0)',pointRadius:5,pointBorderWidth:3,pointHoverRadius:10,/*backgroundColor:colo*/data:[{}]}];

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
    }
    
  ]

  
  
  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
    
    
   console.log(this.TimeScale);
   this.chartOptions.scales.xAxes[0].time.min= this.selectedStartDate;
   this.chartOptions.scales.xAxes[0].time.max= this.selectedEndDate;
   console.log(this.selectedEndDate);
   
   this.chart.ngOnInit();

  }
   
  onDate(event){
    console.log(event);
    this.chartOptions.scales.xAxes[0].time.unit=this.TimeScale;
    this.chartOptions.scales.xAxes[0].time.min= this.selectedStartDate;
    this.chartOptions.scales.xAxes[0].time.max= this.selectedEndDate;
    this.chart.ngOnInit();
  }
  ngModelChange(event){
    console.log(event);
    this.chartOptions.scales.xAxes[0].time.min= this.selectedStartDate;
    this.chartOptions.scales.xAxes[0].time.max= this.selectedEndDate;
    
    //console.log(this.selected);
    //console.log(this.chartOptions.scales.xAxes[0].time.max);
   // this.chart.options.scales.xAxes[];
    //this.chartData.pop();
   
  
    this.chart.chart.update();
    console.log(this.chartOptions.scales.xAxes[0].time.min)
    console.log(this.chart.chart);

    
  }

}
