import { AccountService } from './../../_services/account.service';
import { UserParams } from './../../_models/UserParams';
import { Observable, take } from 'rxjs';
import { MembersService } from './../../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { IUser } from 'src/app/_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: IUser;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];

  constructor(private _service: MembersService) {
    this.userParams = this._service.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this._service.setUserParams(this.userParams);
    this._service.getMembers(this.userParams).subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
    });
  }

  resetFilters(){
    this.userParams = this._service.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this._service.setUserParams(this.userParams);
    this.loadMembers();
  }
}
