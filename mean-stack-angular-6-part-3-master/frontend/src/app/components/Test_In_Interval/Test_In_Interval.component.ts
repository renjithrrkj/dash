import { Component, OnInit,ViewChild } from '@angular/core';
import { IssueService } from '../../issue.service';
import { BaseChartDirective } from 'ng2-charts';
import {Chart} from 'chart.js';
import { Moment } from 'moment';
//import { DateRange } from '../date_range/date_range.component';
//import {ChartDataLabels} from 'chartjs-plugin-datalabels';
function getRandomColor() {//function to generate random colours for labels
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
    if(this.TimeScale=='day')
    {
      this.chartData.splice(1);


    this.issueService.get_Test_History().subscribe((TestArr) => {   //retrive the array of teams test data
      
      
      this.Arr=TestArr as Array<any>;//convert object to array
      this.Arr.pop();//last  element is irrelevant
      this.Arr.sort(function(a,b){//sort array to prevent date jumbling in chart
             return a.Date-b.Date
             })



      console.log(this.Arr ); 
      
       for(var val of this.Arr){      
       var d= new Date(val["Date"]);
      
       
       console.log(d);

         

           var col=getRandomColor();
           //console.log(col);
           this.chartData.push({label:val["Team"],borderColor:col,backgroundColor:'rgba(0,0,0,0)',pointRadius:5,pointBorderWidth:3,pointHoverRadius:10,/*backgroundColor:colo*/data:[{t:d,y: val["count"]}]});

           
          // console.log(this.chartData);//assign dates to specified teams (shrink the array)
           for(var i=0;i<this.chartData.length;i++)
           {
                for(var j=i+1;j<this.chartData.length;j++)
                {
                  if(this.chartData[i]['label']==this.chartData[j]['label'])
                  {   
                      
                      this.chartData[i]['data'].push(this.chartData[j]['data'][0]);
                      this.chartData.splice(j,1);
                      j=j-1;//remove the element after data array is updated and move to next element
                  }

                }

           }

         
         
       }
       
      
      

     console.log(this.chartData);
    
      });
    }
    else if(this.TimeScale=='month')
    {
      this.chartData.splice(1);
      this.issueService.get_Test_History_Month().subscribe((TestArr) => {   //retrive the array of teams test data
      
      
        this.Arr=TestArr as Array<any>;//convert object to array
        this.Arr.pop();//last  element is irrelevant
        this.Arr.sort(function(a,b){//sort array to prevent date jumbling in chart
               return a.Date-b.Date
               })
  
  
  
        console.log(this.Arr); 
        
         for(var val of this.Arr){      
         var d= new Date(val["Date"]);
        
         
         console.log(d);
  
           
  
             var col=getRandomColor();
             console.log(col);
             this.chartData.push({label:val["Team"],borderColor:col,backgroundColor:'rgba(0,0,0,0)',pointRadius:5,pointBorderWidth:3,pointHoverRadius:10,/*backgroundColor:colo*/data:[{t:d,y: val["count"]}]});
  
             
            // console.log(this.chartData);//assign dates to specified teams (shrink the array)
             for(var i=0;i<this.chartData.length;i++)
             {
                  for(var j=i+1;j<this.chartData.length;j++)
                  {
                    if(this.chartData[i]['label']==this.chartData[j]['label'])
                    {   
                        
                        this.chartData[i]['data'].push(this.chartData[j]['data'][0]);
                        this.chartData.splice(j,1);
                        j=j-1;//remove the element after data array is updated and move to next element
                    }
  
                  }
  
             }
  
           
           
         }
         
        
        
  
        console.log(this.chartData);
      
        });

    }
  }
  

  selectedStartDate= new Date(1555200000000);
  selectedEndDate= new Date();

  TimeScale ='month';//set timescale of graph
  
  
  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true ,// THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
    
       
    
    
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
        fontSize:15,
        fontFamily:"Ariel",
        
        },

      }]
      
  },
  legend: {
    display: true,
    position: 'bottom',
    labels: {
        fontColor: 'rgb(1, 2, 1)',
        fontSize:18
    }
  },
  layout: {
    padding: {
        left: 150,
        right: 85,
        top: 5,
        bottom: 9
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

  // this declaration provides a outline for populating rest of array  without this error occcurece is sure.
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
    
    
 

  }
   

  onClick(event)//trigers the event to modify the time range in  graph
  
  {
    console.log(event);
    
    
    console.log(this.TimeScale);
    this.chartOptions.scales.xAxes[0].time.min= this.selectedStartDate;
    this.chartOptions.scales.xAxes[0].time.max= this.selectedEndDate;
    this.chartOptions.scales.xAxes[0].time.unit=this.TimeScale;
    console.log(this.selectedEndDate);
    
    
    this.ngOnInit();
    this.chart.ngOnInit();
    this.chart.chart.update();
    

  }

}
