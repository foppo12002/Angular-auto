import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";


interface ProjInterface {
  appName: string;
  projName: string;
}

class Project implements ProjInterface {
  appName: string;
  projName: string;
  isChecked: boolean = false;


  constructor(appName: string = "", projName: string = "") {
    this.appName = appName;
    this.projName = projName;
  }
}

type Projects = Project[];


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
    }).subscribe(value => {
      const projs = value as ProjInterface[]
      this.projects = projs.map(proj => new Project(proj.appName, proj.projName))
    })
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


