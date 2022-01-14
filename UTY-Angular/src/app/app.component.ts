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
type rqrq = {
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
    this.http.get('http://localhost:8777/godJJ/autoinitprojecthandler/gg8', {
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
    this.projects.filter(proj => proj.isChecked).map(proj => proj.appName).forEach(appName => {
      const safasf = {
        asfsaf: [appName]
      }
      this.http.post('http://localhost:8777/godJJ/autoinitprojecthandler/gg7', safasf, {
        responseType: 'blob'
      }).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // document.body.appendChild(a);
        // a.href = url;
        // a.click();
        window.open(url);
        // window.URL.revokeObjectURL(url);
        // document.body.removeChild(a);
        // value = value as string[]s
        // value.forEach((s: string) => {
        //   console.log(s);
        //   let downloadURL = `data:application/zip;base64,${s}`;
        // })

      });
    })


  }

  urlOpen() {
    let downloadURL = `data:application/zip;base64+""`;
    // window.open(downloadURL);
  }

}


