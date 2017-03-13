import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { FormControl, FormGroup ,FormBuilder,Validators  }            from '@angular/forms';

import { UserService } from './user.service';
import { User } from './user';
import { Address } from './user';
@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  userForm:FormGroup;

  isDarkTheme: boolean = false;
  lastDialogResult: string;


  states  = [ 'CA', 'VA' ]; 
  constructor(
  private userService: UserService,
  private route: ActivatedRoute,
  private location: Location,
  private fb: FormBuilder
  ) {
    this.createForm();
  }


   createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required ],
      address: this.fb.group(new Address()),
      gender: '',
      new: ''
    });
  }
   

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(+params['id']))
      .subscribe(user => this.user = user);
  }
  goBack(): void {
    this.location.back();
  }

   ngOnChanges(){
     console.log("changed");
     this.userForm.reset({
    name: this.user.name,
    address: this.user.addresses[0] || new Address()
  });
    this.userForm.setValue({
      name:    this.user.name,
      address: this.user.addresses[0] || new Address()
    });
  }

}