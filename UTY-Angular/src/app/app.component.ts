import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

class Project {
  appName: string;
  isChecked: boolean = false;

  constructor(appName: string) {
    this.appName = appName || "";
  }
}

type Projects = Project[];
type rqrq = {
  appList: string[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.post('http://localhost:8080/gg8', {
      responseType: 'json'
    }).subscribe((value) => {
      const asfsfa = (value as rqrq).appList
      this.projects = asfsfa?.map((stringgg) => {
        return new Project(stringgg)
      }) || [];
    });
    // this.http.post('http://localhost:8080/gg8', {
    //   responseType: 'json'
    // }).subscribe(res => {
    //     alert(
    //       "hello word"
    //     )
    //   }

  }


  projects: Projects = [];

  getFile() {


  }

}


