import {Moment} from 'moment';
import moment = require('moment');
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'date_range',
    templateUrl: './date_range.component.html'

  })

export class DateRange implements OnInit
{
  constructor() { }

        selected: {startDate: Moment, endDate: Moment};
        ngOnInit()
        {

        }
        
        
        get Select(){
            return this.selected;
        }
        ngModelChange(event){
          console.log(event);
        }
}   