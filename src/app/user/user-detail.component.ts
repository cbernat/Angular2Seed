import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute,Router, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
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
      id: '',
      name: ['', Validators.required ],// name: new formControl('', Validators.required); Validators.compose 
      address: this.formBuilder.group(new Address("","","","")),
      gender: '',
      new: ''
    });
    

  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
       let id = params['id'];
       if (id != undefined && id != "create"){
          this.userService.getUser(id).then(user => {this.user = user;
            this.userForm.patchValue({
              id : this.user.id,
              name: this.user.name,
              address: this.user.addresses[0]
          });
      
          //this.userForm.controls.name.patchValue("ddddd"); 
          //TODO: add validations
      });
    }
    else
    {
      var newUserId = 0;
      newUserId = this.userService.getAmountUsers();
      this.user = new User (newUserId, "", [new Address("","","","")]);

      this.userForm.patchValue({
            id : this.user.id,
            name: this.user.name,
            address: this.user.addresses[0]

        });
    }
  });
  
}

  goBack(): void {
    this.router.navigate(["/users"]); //this.router.navigate(["/users", user.id]);
  }

  saveUser(userData): void{
    userData.id = this.user.id;
    this.userService.addUser(userData).subscribe();//then  subscribe(()=>{})
    this.goBack();
  }


  resetValues(): void{
    this.userForm.reset({ //use this when cancelling edition
      name: this.user.name,
      address: this.user.addresses[0] || new Address("","","","")
  });
  }

}