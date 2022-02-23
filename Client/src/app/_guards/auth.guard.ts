import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _service: AccountService, private _toast: ToastrService) { }
  canActivate(): Observable<boolean>{
    return this._service.currentUser$.pipe(
      map(user => {
        if(user) return true;
        this._toast.error('You must be logged in to access this page');
      })
    )
  }
}
