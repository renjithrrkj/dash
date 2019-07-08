import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';


@Component({
  selector: 'app-sample-list',
  templateUrl: './sample-list.component.html',
  styleUrls: ['./sample-list.component.css']
})


export class SampleListComponent implements OnInit {

  data: Array<any>;

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.issueService.getIssues().subscribe((issues) => {
      console.log(issues);
    });
  }
}