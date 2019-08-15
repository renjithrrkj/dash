import { Component, OnInit,ViewChild } from '@angular/core';
import { IssueService } from '../../issue.service';
import { BaseChartDirective } from 'ng2-charts';
import {Chart} from 'chart.js';
import { Moment } from 'moment';
//import { timingSafeEqual } from 'crypto';
//import moment = require('moment');
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

//to get date ranges for inserting zeroes to data if no tests were conducted
function dateRange(startDate, endDate) {
  var dates =[];
  endDate=new Date(endDate.getFullYear(), endDate.getMonth()-1, 1);
  startDate=new Date(startDate.getFullYear(), startDate.getMonth()-1, 1);
  
  while (endDate >= startDate ) {
    startDate= new Date(startDate.getFullYear(),startDate.getMonth()+1,1);
    dates.push(startDate);
    
    


 }
 console.log(dates);
  return dates;
 
}


//to get date rage of year
function dateRangeYear(startDate, endDate) {
  var dates =[];
  endDate=new Date(endDate.getFullYear()-1,0);
  startDate=new Date(startDate.getFullYear()-2,0);
  
  while (endDate >= startDate ) {
    startDate= new Date(startDate.getFullYear()+1,0);
    dates.push(startDate);
    
    


 }
 console.log(dates);
  return dates;
 
}

//to get date range of day
function dateRangeDay(startDate, endDate) {
  var dates =[];
  //startDate=new Date(startDate.getFullYear(), startDate.getMonth(), 1);
 startDate=new Date(Number(startDate));
 endDate=new Date(Number(endDate));
 endDate.setDate(endDate.getDate()-1);
 startDate.setDate(startDate.getDate()-5);
  while (endDate > startDate ) {
    
    
    startDate.setDate(startDate.getDate()+1);
    dates.push(startDate);
    dates.push(new Date(startDate));
    console.log(startDate);
        
 }
 console.log(dates);
  return dates;
 
}


@Component({
  selector: 'Test_Interval',
  templateUrl: './Test_In_Interval.component.html',
  styleUrls: ['./Test_In_Interval.component.css']
})

export class Test_In_IntervalComponent implements OnInit {

  constructor(private issueService: IssueService,/*private daterange:DateRange*/) { }
  @ViewChild(BaseChartDirective,{ static: true }) public chart: BaseChartDirective;
  selectedStartDate= new Date(1555200000000);
  selectedEndDate= new Date();
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



      
      
       for(var val of this.Arr)
       {      
           var d= new Date(val["Date"]);  //convert  timestamp to date format 
        
           var col=getRandomColor();
           //console.log(col);
           this.chartData.push({label:val["Team"],borderColor:col,pointBackgroundColor:col,backgroundColor:'rgba(0,0,0,0)',pointRadius:3,pointBorderWidth:3,pointHoverRadius:6,data:[{t:d,y: val["count"]}]});

           
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

       var daterange =dateRangeDay(this.selectedStartDate,new Date());//get daterange
       console.log(daterange);
       
        for(var value1 of this.chartData)
        {
         //var dataArr=[];
         
         /* for(var value2 of value1['data'])
          {
           
            dataArr.push(value2['t']);
            console.log(value2);
          
          
          }*/
          if(this.chartData.indexOf(value1)!=0){
          
          for(var dat of daterange)
           { 
           // console.log(dataArr.includes(dat));
            console.log(dat);
            
            
             value1['data'].push({t:dat,y:0});              
            
           
          
          }
        }

          for( var i=0;i< value1['data'].length-1;i++)
          {
              for(var j=i+1;j<value1['data'].length;j++)
              {
                if(Number(value1['data'][i]['t'])===Number(value1['data'][j]['t']))
                {
                  value1['data'].splice(j,1);
                  j=j-1;
                  console.log(this.chartData);
                }
              }
          }
       
     }
       
     for(var value1 of this.chartData)
     { 
       value1['data'].sort(function(a,b){
         return Number(a.t) - Number(b.t)
       })

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
             this.chartData.push({label:val["Team"],borderColor:col,pointBackgroundColor:col,backgroundColor:'rgba(0,0,0,0)',pointRadius:3,pointBorderWidth:3,pointHoverRadius:6,/*backgroundColor:colo*/data:[{t:d,y: val["count"]}]});
  
             
           
            
            
  
           
           
         }
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
         

         //loop to shift aggregate to start of month
         for(var value1 of this.chartData)
             {
               console.log(value1);
              if(this.chartData.indexOf(value1)!=0)
              {
               for(var value2 of value1['data'])
               {
                 value2['t'] = new Date(value2['t'].getFullYear(), value2['t'].getMonth()+1, 1); 
               }
              }
             }


        var daterange =dateRange(this.selectedStartDate,new Date());//get daterange
        console.log(daterange);
        
         for(var value1 of this.chartData)
         {
          /*var dataArr=[];
          
           for(var value2 of value1['data'])
           {
            
             dataArr.push(value2['t']);
             console.log(value2);
           
           
           }
           */
           for(var dat of daterange)
            { 
             //console.log(dataArr.includes(dat));
             console.log(dat);
             
             
              value1['data'].push({t:dat,y:0});              
             
            
           
           }

           for( var i=0;i< value1['data'].length-1;i++)
           {
               for(var j=i+1;j<value1['data'].length;j++)
               {
                 if(Number(value1['data'][i]['t'])===Number(value1['data'][j]['t']))
                 {
                   value1['data'].splice(j,1);
                   j=j-1;
                   console.log(this.chartData);
                 }
               }
           }
        
      }


         

         for(var value1 of this.chartData)
         { 
           value1['data'].sort(function(a,b){
             return Number(a.t) - Number(b.t)
           })

           }
         
        
  
        console.log(this.chartData);
      
        });

    }


    else if(this.TimeScale=='year')
    {
      this.chartData.splice(1);
      this.issueService.get_Test_History_Year().subscribe((TestArr) => {   //retrive the array of teams test data
      
      
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
             this.chartData.push({label:val["Team"],borderColor:col,pointBackgroundColor:col,backgroundColor:'rgba(0,0,0,0)',pointRadius:3,pointBorderWidth:3,pointHoverRadius:6,/*backgroundColor:colo*/data:[{t:d,y: val["count"]}]});
  
             
           
            
            
  
           
           
         }
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
         

         //loop to shift aggregate to start of year
         for(var value1 of this.chartData)
             {
               console.log(value1);
              if(this.chartData.indexOf(value1)!=0)
              {
               for(var value2 of value1['data'])
               {
                 value2['t']= new Date(value2['t'].getFullYear(),0); 
               }
              }
             }


        var daterange =dateRangeYear(this.selectedStartDate,new Date());//get daterange year
        console.log(daterange);
        
         for(var value1 of this.chartData)
         {
          var dataArr=[];
          
           for(var value2 of value1['data'])
           {
            
             dataArr.push(value2['t']);
             console.log(value2);
           
           
           }
           
           for(var dat of daterange)
            { 
             console.log(dataArr.includes(dat));
             console.log(dat);
             
             
              value1['data'].push({t:dat,y:0});              
             
            
           
           }

           for( var i=0;i< value1['data'].length-1;i++)
           {
               for(var j=i+1;j<value1['data'].length;j++)
               {
                 if(Number(value1['data'][i]['t'])===Number(value1['data'][j]['t']))
                 {
                   value1['data'].splice(j,1);
                   j=j-1;
                   console.log(this.chartData);
                 }
               }
           }
        
      }


         

         for(var value1 of this.chartData)
         { 
           value1['data'].sort(function(a,b){
             return Number(a.t) - Number(b.t)
           })

           }
         
        
  
        console.log(this.chartData);
      
        });

    }
  }
  

 

  TimeScale ='month';//set timescale of graph
  
  
  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true ,// THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
    
       
    
    
    title :{ 
      display:true,
      text :'Test Execution History',
      fontSize:18,
      fontFamily:'Helvetica Neue'
    },
    scales: {
      xAxes: [{
          type: 'time',
          
          time: {
            unit: this.TimeScale,
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
    bodyFontFamily:'courier',
    /*callbacks: {
       
      title: function(tooltipItem) {
        Test_In_IntervalComponent()
        if(TimeScale=="month")
      {
          return(tooltipItem[0]['label'].slice(0,4));
        }
        else if(Test_In_IntervalComponent.TimeScale=="day")
      {
        return (tooltipItem[0]['label'].slice(0,9));
      }
      else if(this.TimeScale=="year")
      {
        return (tooltipItem[0]['label'].slice(4,9));
      }
      else
      {
        console.log(t);
        return (tooltipItem[0]['label'].slice(4,9));
        
      }
    }
      
  }*/
},
  
  elements: {
    line: {
        tension: 0
    }
}
  }

   
 labels = [];

  // this declaration provides a outline for populating rest of array  without this error occcurece is sure.
  chartData= [{label:'Teams:',borderColor:'rgba(0,0,0,0)',pointBackgroundColor:'rgba(0,0,0,0)',backgroundColor:'rgba(0,0,0,0)',pointRadius:5,pointBorderWidth:3,pointHoverRadius:10,/*backgroundColor:colo*/data:[{t:new Date(0),y:0}]}];
   
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
   // this.chart.ngOnInit();
   // this.chart.chart.update();
    

  }
 
}
