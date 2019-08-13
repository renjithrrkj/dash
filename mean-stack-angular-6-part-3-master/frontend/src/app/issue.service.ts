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

 // getIssueById(id) {
  //  return this.http.get(`${this.uri}/issues/${id}`);
  //}

  /*addIssue(title, responsible, description, severity) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.http.post(`${this.uri}/issues/add`, issue);
  }

  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    };
    return this.http.post(`${this.uri}/issues/update/${id}`, issue);
  }

  deleteIssue(id) {
    return this.http.get(`${this.uri}/issues/delete/${id}`);
  }*/
  getPass_Per_Team()
  {
    return this.http.get(`${this.uri}/Teams`);
   
  }
  get_Test_History()
  {
    return this.http.get(`${this.uri}/Teams/daily`);
  }
  get_Test_History_Month()
  {
    return this.http.get(`${this.uri}/Teams/monthly`);
  }
  get_Test_History_Year()
  {
    return this.http.get(`${this.uri}/Teams/yearly`);
  }

  get_Hours_saved()
  {
    return this.http.get(`${this.uri}/hours`);
  }
  
  get_Hours_saved_month()
  {
    return this.http.get(`${this.uri}/hours/month`)
  }

  get_Hours_saved_year()
  {
    return this.http.get(`${this.uri}/hours/year`)
  }

}
