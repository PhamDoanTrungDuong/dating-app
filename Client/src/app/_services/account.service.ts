import { PresenceService } from './presence.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { stringify } from 'querystring';
import { IUser } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private _http:HttpClient, private presence: PresenceService) { }

  login(model: any) {
    return this._http.post(this.baseUrl + 'account/login', model).pipe(
      map((res: IUser) => {
        const user = res;
        if(user){
          this.setCurrentUser(user);
          this.presence.CreateHubConnection(user);
        }
      })
    );
  }

  register(model: any){
    return this._http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: IUser) => {
        if(user){
          this.setCurrentUser(user);
          this.presence.CreateHubConnection(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: IUser){
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

}
