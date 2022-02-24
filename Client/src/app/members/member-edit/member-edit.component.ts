import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/_services/members.service';
import { AccountService } from './../../_services/account.service';
import { IUser } from './../../_models/user';
import { Member } from 'src/app/_models/member';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: IUser;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  
  constructor(private _accountService: AccountService, private _memberService: MembersService, private _toast: ToastrService) {

    this._accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember() {
    this._memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

  updateMember() {
    this._memberService.updateMember(this.member).subscribe(() => {
      this._toast.success('Profile updated successfully');
      this.editForm.reset(this.member);
    }) 
  }

}
