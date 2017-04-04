export class User {
   id: number;
   name: string;
   addresses: Address[];
  /*toJson(): any{
    let userJson = {
      id: this.id,
      name: this.name,
      addresses: this.addresses
    };

    return userJson;
  }

  static fromJson(json): User {
    let user = Object.create(User.prototype);
    return Object.assign(user, json, {
      id: json._id,
      name: json._name,
      addresses: json._addresses
    });
  }*/
}
export class Address {
  street = '';
  city   = '';
  state  = '';
  zip    = '';
  /*toJson(): any{
    let userJson = {
      street: this.street,
      city: this.city,
      zip: this.zip
    };

    return userJson;
  }

  static fromJson(json): User {
    let user = Object.create(User.prototype);
    return Object.assign(user, json, {
      
    });
  }*/
}


