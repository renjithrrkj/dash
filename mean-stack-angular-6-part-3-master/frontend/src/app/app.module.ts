import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';







//import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {GraphComponent} from './components/graph/graph.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {SampleListComponent} from './components/sample-list/sample-list.component';
import {Test_In_IntervalComponent} from './components/Test_In_Interval/Test_In_Interval.component';
import {DashboardComponent} from  './components/dashboard/dashboard.component';
import {Bottom_barComponent} from './components/bottom_bar/bottom_bar.component';
import {Pie_ChartComponent} from './components/pie_chart/pie_chart.component';


import { IssueService } from './issue.service';
import { MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [
  {path: 'graph', component:GraphComponent },
  {path:'sampleList',component:SampleListComponent},
  {path:'bar', component:TopBarComponent},
  {path:'Test_Interval',component:Test_In_IntervalComponent},
  {path:'dashboard',component:DashboardComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    TopBarComponent,
    SampleListComponent,
    Test_In_IntervalComponent,
    DashboardComponent,
    Bottom_barComponent,
    Pie_ChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(routes),
    NgxDaterangepickerMd.forRoot(),
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSidenavModule,
    MatTabsModule,
    MatGridListModule
    
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
