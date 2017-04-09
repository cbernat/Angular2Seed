import { User } from './user';
import {Address} from './user';

export const USERS: User[] =  [];

let userFromJson: User = User.fromJson({ id: 11, name: 'Juan Perez'});

for(var i = 0; i < 10; i++){
    let user1: User = new User(i, "Name"+ i, [new Address("Columbia 123", "Larala", "CA", "6004")]);
    USERS.push(user1);
  }

 console.log("From Json user id: " + userFromJson.id);