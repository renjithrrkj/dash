
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
ngOnInit() {
  this.issueService.get_Test_History().subscribe((TestArr) => {
   
   this.Arr=TestArr as Array<any>;
   this.No_of_Executed=this.Arr[this.Arr.length-1]['No Of Tests Executed'];
   this.No_of_Executed=this.No_of_Executed.toString();

   

});


}
}