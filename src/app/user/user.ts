export class User {
   id: number;
   name: string;
   addresses: Address[];

   constructor(id: number, name: string, addresses: Address[]) {
        this.id = id;
        this.name = name;
        this.addresses = addresses;
    }
  toJson(): any{
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
      addresses: Address.fromJson(json._addresses)
    });
  }
}
export class Address {
  street = '';
  city   = '';
  state  = '';
  zip    = '';
  constructor(street: string, city: string, state: string, zip:string) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
  toJson(): any{
    let addressJson = {
      street: this.street,
      city: this.city,
      zip: this.zip
    };

    return addressJson;
  }

  static fromJson(json): Address {
    let address = Object.create(Address.prototype);
    return Object.assign(address, json, {
      
    });
  }
}


