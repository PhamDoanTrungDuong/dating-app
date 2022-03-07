import { Router } from '@angular/router';
import { IUser } from 'src/app/_models/user';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toast: ToastrService, private router: Router) { }

  CreateHubConnection(user: IUser) {
    this.hubConnection = new HubConnectionBuilder()
        .withUrl(this.hubUrl + 'presence', {
          accessTokenFactory: () => user.token
        })
        .withAutomaticReconnect()
        .build();

    this.hubConnection
        .start()
        .catch(err => console.log(err));

    this.hubConnection.on('UserIsOnline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        this.onlineUsersSource.next([...usernames, username]);
      })
    });

    this.hubConnection.on('UserIsOffline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
      this.onlineUsersSource.next([...usernames.filter(x => x !== username)]);
      })
    });

    this.hubConnection.on("GetOnlineUsers", (username: string[]) => {
      this.onlineUsersSource.next(username);
    })

    this.hubConnection.on('NewMessageReceived', ({username, knownAs}) => {
      this.toast.info(knownAs + ' has sent you a new message!')
        .onTap
        .pipe(take(1))
        .subscribe(() => this.router.navigateByUrl('/members/' + username + '?tab=3'));
    })
  }

  stopHubConnection() {
    this.hubConnection.stop().catch(err => console.log(err));
  }

}
