import { Injectable } from '@angular/core';
import {User} from './user'
import { USERS } from './mock-users';

@Injectable()
export class UserService {
    getUsers(): Promise<User[]> {
        return Promise.resolve(USERS);
    } 
    getUser(id: number): Promise<User> {
        return this.getUsers()
                .then(Users => Users.find(user => user.id === id));
    }
    addUser(user: User):Promise<number> {
        USERS.push(user);
        return Promise.resolve(user.id);
    }
}