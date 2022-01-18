import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

class Project {
  appName: string;
  isChecked: boolean = false;

  constructor(appName: string) {
    this.appName = appName || "";
  }
}

type Projects = Project[];
type apps = {
  appList: string[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private blob: Blob | undefined;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8777/godJJ/autoinitprojecthandler/searchAppName', {
      responseType: 'json'
    }).subscribe((value) => {
      const appLists = (value as apps).appList
      this.projects = appLists?.map((appname) => {
        return new Project(appname)
      }) || [];
    });
  }


  projects: Projects = [];
  red: any;

  getFile() {
    this.projects.filter(proj => proj.isChecked).map(proj => proj.appName).forEach(appName => {
      const appnameJson = {
        name: [appName]
      }
      this.http.post('http://localhost:8777/godJJ/autoinitprojecthandler/downAllFile', appnameJson, {
        responseType: 'blob'
      }).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
    })


  }
}


