import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {


uri = 'http://52.15.111.120:8082';


  constructor(private http: HttpClient) { }

  getIssues() {
    return this.http.get(`${this.uri}/tez`);
  }

 
  
  getPass_Per_Team()// get latest test results for bar graph
  {
    return this.http.get(`${this.uri}/Teams`);
   
  }
  get_Test_History()// for line chart tests per day
  {
    return this.http.get(`${this.uri}/Teams/daily`);
  }
  get_Test_History_Month()// tests per month
  {
    return this.http.get(`${this.uri}/Teams/monthly`);
  }
  get_Test_History_Year()
  {
    return this.http.get(`${this.uri}/Teams/yearly`);
  }

  get_Hours_saved()// hours saved per day
  {
    return this.http.get(`${this.uri}/hours`);
  }
  
  get_Hours_saved_month()//hrs saved per month
  {
    return this.http.get(`${this.uri}/hours/month`)
  }

  get_Hours_saved_year()//hrs saved per year
  {
    return this.http.get(`${this.uri}/hours/year`)
  }

}
