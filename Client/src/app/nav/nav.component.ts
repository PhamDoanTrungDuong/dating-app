import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IUser } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<IUser>;

  constructor(private _service:AccountService, private _router: Router, private _toast: ToastrService) { }

  ngOnInit(): void {
    this.currentUser$ = this._service.currentUser$;
  }

  login() {
    this._service.login(this.model).subscribe(res => {
      this._router.navigateByUrl('/members');
    })
  }

  logout(){
    this._service.logout();
    this._router.navigateByUrl('/');
  }

}
