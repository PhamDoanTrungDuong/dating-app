import { AccountService } from './_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Dating App';
  users: any;
  constructor(private _http: HttpClient, private _service: AccountService){}
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user = JSON.parse(localStorage.getItem('user'));
    this._service.setCurrentUser(user);
  }

}
