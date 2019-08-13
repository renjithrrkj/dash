
import { Component } from '@angular/core';  
import { IssueService } from '../../issue.service';


@Component({  
  selector: 'dashboard',  
  templateUrl: './dashboard.component.html',  
  styleUrls: ['./dashboard.component.css']  
})  
export class DashboardComponent {  
  // Number of cards to be generated with column and rows to be covered  
  constructor(private issueService: IssueService) {
  
}
Arr:Array<any>;
No_of_Executed;
Hours_saved;
No_of_teams;
ngOnInit() {
  this.issueService.get_Test_History().subscribe((TestArr) => {
   
   this.Arr=TestArr as Array<any>;
   this.No_of_Executed=this.Arr[this.Arr.length-1]['No Of Tests Executed'];
   this.No_of_Executed=this.No_of_Executed.toString();

  

});
this.issueService.get_Hours_saved().subscribe((HoursArr)=>{
  this.Arr=HoursArr as Array<any>;
  this.Hours_saved=this.Arr[this.Arr.length-1]['No Of Hours_saved'];
  this.Hours_saved=this.Hours_saved.toString();
});
this.issueService.getPass_Per_Team().subscribe((Teams)=>{
  this.Arr=Teams as Array<any>;
  this.No_of_teams=Object.keys(this.Arr[0]).length;
  this.No_of_teams=this.No_of_teams.toString();

})

}
}