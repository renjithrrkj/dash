import { Component, OnInit,ViewChild } from '@angular/core';

import { IssueService } from '../../issue.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';




@Component({
    selector: 'pie-chart',
    templateUrl: './pie_chart.component.html',
    styleUrls: ['./pie_chart.component.css']
  })
  export class Pie_ChartComponent implements OnInit {
  



    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
          position: 'left',
        },
        /*plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              const label = ctx.chart.data.labels[ctx.dataIndex];
              return label;
            },
          },
          
        }*/
      };
      public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
      public pieChartData: number[] = [300, 500, 100];
      public pieChartType: ChartType = 'pie';
      public pieChartLegend = true;
      //public pieChartPlugins = [pluginDataLabels];
      public pieChartColors = [
        {
          backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
        },
      ];





    constructor(private issueService: IssueService) { }


    ngOnInit(){

    }

  }