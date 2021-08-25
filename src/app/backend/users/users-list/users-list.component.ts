import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  confirmBlockUnblockUser( in_userId: any, flag: number ) {}

  softDelete( in_userId: any ) {}

}
