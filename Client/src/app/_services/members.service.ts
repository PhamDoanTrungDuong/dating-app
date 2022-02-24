import { Member } from './../_models/member';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getMembers() {
    return this._http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string){
    return this._http.get<Member>(this.baseUrl + 'users/' + username);
  }

}
