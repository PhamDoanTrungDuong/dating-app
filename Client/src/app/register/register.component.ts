import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister: any = new EventEmitter();

  constructor(private _service: AccountService, private _toasts: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this._service.register(this.model).subscribe(res => {
      this.cancel()
    },error => {
      console.log(error);
      this._toasts.error(error.error);
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
