import {Moment} from 'moment';
import { Component, OnInit } from '@angular/core';
import { Test_In_IntervalComponent } from '../Test_In_Interval/Test_In_Interval.component';

@Component({
    selector: 'date_range',
    templateUrl: './date_range.component.html'

  })

export class DateRange implements OnInit
{
  constructor(private test:Test_In_IntervalComponent) { }

        selected: {startDate: Moment, endDate: Moment};
        ngOnInit()
        {

        }
        
        
        get Select(){
            return this.selected;
        }
        ngModelChange(event){
          console.log(event);
          console.log(this.Select);
         this.test.chartOptions.scales.xAxes[0].ticks.min=this.Select['startDate']['_d'];
         this.test.chartOptions.scales.xAxes[0].ticks.max=this.Select['endDate']['_d'];
          console.log(this.test.chartOptions.scales.xAxes[0].ticks.max);
          this.test.ngOnInit();
        }
}   
