import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'user-list',
  templateUrl:'./user-list.component.html',
  styleUrls: ['./user-list.component.css'],
providers: [UserService]

})
export class UserListComponent  implements OnInit{ 
ngOnInit(): void {
  this.getUsers();
  }

constructor(private userService: UserService) { }
getUsers(): void {
    this.userService.getUsers().then(users =>this.users = users);
  }

users : User[];
selectedUser : User;
onSelect(user: User): void {
  this.selectedUser = user;
}



}
