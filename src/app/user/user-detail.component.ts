import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute,Router, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { FormControl, FormGroup ,FormBuilder,Validators  }            from '@angular/forms';


import { UserService } from './user.service';
import { User } from './user';
import { Address } from './user';
@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls:  ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  userForm:FormGroup;
  newUser : User;



  states  = [ 'CA', 'VA' ]; 
  constructor(
  private userService: UserService,
  private route: ActivatedRoute,
  private router: Router,
  private location: Location,
  private formBuilder: FormBuilder //formBuilder en vez de formBuilder
  ) {
    this.createForm();
  }


   createForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required ],// name: new formControl('', Validators.required); Validators.compose 
      address: this.formBuilder.group(new Address()),
      gender: '',
      new: ''
    });
    

  }


  ngOnInit(): void {
    if (this.route.params['id'] != null){
      this.route.params
        .switchMap((params: Params) => this.userService.getUser(+params['id']))
        .subscribe(user => {this.user = user;
        this.userForm.patchValue({
          name: this.user.name,
          address: this.user.addresses[0]

      });
      
      //this.userForm.controls.name.patchValue("ddddd"); 
      //add validations
    });
  }
  else
  {
     this.user = {
       id: 3,
       name: "",
       addresses: [
      {street: '123 Main',  city: 'Anywhere', state: 'CA',  zip: '94801'},
      {street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226'},
    ] 
     };

     this.userForm.patchValue({
          name: this.user.name,
          address: this.user.addresses[0]

      });
  }
  }
  goBack(): void {
    this.router.navigate(["/users"]); //this.router.navigate(["/users", user.id]);
  }

  saveUser(userData): void{
    this.userService.addUser(userData).subscribe();//then  subscribe(()=>{})
  }

   ngOnChanges(){
     console.log("changed");
     
    this.userForm.setValue({
      name:    this.user.name,
      address: this.user.addresses[0] || new Address()
    });
  };

  resetValues(): void{
    this.userForm.reset({ //use this when cancelling edition
      name: this.user.name,
      address: this.user.addresses[0] || new Address()
  });
  }

}