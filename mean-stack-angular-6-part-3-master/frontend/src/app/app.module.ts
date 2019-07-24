import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule } from '@angular/forms';




//import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import {GraphComponent} from './components/graph/graph.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {SampleListComponent} from './components/sample-list/sample-list.component';
import {Test_In_IntervalComponent} from './components/Test_In_Interval/Test_In_Interval.component';
import {DateRange} from './components/date_range/date_range.component';


import { IssueService } from './issue.service';

const routes: Routes = [
  { path: 'create', component: CreateComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'list', component: ListComponent},
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'graph', component:GraphComponent },
  {path:'sampleList',component:SampleListComponent},
  {path:'bar', component:TopBarComponent},
  {path:'Test_Interval',component:Test_In_IntervalComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    GraphComponent,
    TopBarComponent,
    SampleListComponent,
    Test_In_IntervalComponent,
    DateRange
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(routes),
    NgxDaterangepickerMd.forRoot(),
    FormsModule
    
  ],
  providers: [IssueService,DateRange,Test_In_IntervalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
