import { Injectable } from '@angular/core';
import {User} from './user'
import { USERS } from './mock-users';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
    getUsers(): Promise<User[]> {
        if (localStorage.getItem("userList") === null){
            localStorage.setItem('userList', JSON.stringify(USERS));
        }
        return Promise.resolve(USERS);    
        //return Promise.resolve(User.fromJSON(JSON.parse(localStorage.getItem("userList"))));
    } 
    getUser(id: number): Promise<User> {
        return this.getUsers()
                .then(Users => Users.find(user => user.id === id));
    }
    addUser(user: User):Observable<number> {
        USERS.push(user);
        return Observable.of(user.id); //Add this as observable
    }
}