import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  Users: object[] = JSON.parse(localStorage.getItem('us'));

  constructor(private http: Http) {
    if (this.Users === null) {
      this.RefreshData();
    }
  }

  RefreshData() {
    let UserList = [];
    this.http.get('https://randomuser.me/api/?results=200').subscribe(
      result => {
        for (let i = 0; i < result.json().results.length; i++) {
          let user = result.json().results[i];
          let UserObj = {
            'Picture': user.picture.thumbnail,
            'Name': user.name.first + ' ' + user.name.last,
            'Email': user.email,
            'Phone': user.phone
          };
          UserList.push(UserObj);
          console.log(result.json());
        }
        localStorage.setItem('us', JSON.stringify(UserList));
        this.Users = JSON.parse(localStorage.getItem('us'));
      },
      error => { console.log(error); }
    );
  }

  DeleteData(index) : void {
    this.Users.splice(index, 1);
  }

}
