import { Injectable } from '@angular/core';
import {User} from './user'
import { USERS } from './mock-users';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
    getUsers(): Promise<User[]> {
        if (localStorage.getItem("userList") === null){
            this.listToJSON(USERS);
        }
        return Promise.resolve(USERS);    
        //return Promise.resolve(User.fromJSON(JSON.parse(localStorage.getItem("userList"))));
    } 
    getUser(id: number): Promise<User> {
        return this.getUsers()
                .then(Users => Users.find(user => user.id == id));
    }
    addUser(user: User):Observable<number> {
        USERS.push(user);
        return Observable.of(user.id); //Add this as observable
    }

    listToJSON(USERS): void{
        var usersList = "";
        for(var i = 1; i <= USERS.length; i++){
            usersList += JSON.stringify(USERS[i]);
        }
        localStorage.setItem('userList', usersList);
    }
    getAmountUsers(): number{
        return USERS.length;
    }
}