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
 /* @Input() */user: User;
  userForm:FormGroup;

  isDarkTheme: boolean = false;
  lastDialogResult: string;


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
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(+params['id']))
      .subscribe(user => {this.user = user;
      this.userForm.patchValue({
        name: this.user.name,
        address: this.user.addresses[0]

    });
    
    //this.userForm.controls.name.patchValue("ddddd"); 
  });
  }
  goBack(): void {
    this.router.navigate(["/users"]); //this.router.navigate(["/users", user.id]);
  }

  saveUser(): void{
    this.userService.addUser(this.user);
  }

   ngOnChanges(){
     console.log("changed");
     this.userForm.reset({ //use this when cancelling edition
      name: this.user.name,
      address: this.user.addresses[0] || new Address()
  });
    this.userForm.setValue({
      name:    this.user.name,
      address: this.user.addresses[0] || new Address()
    });
  }

}