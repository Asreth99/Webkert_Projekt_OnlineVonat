import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/services/models/Users';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    passwordConfirm: new FormControl(),


  });


  firstFormGroup = this._formBuilder.group({
    username: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    email: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],

  });




  constructor(private _formBuilder: FormBuilder, private authService: AuthService,  private userService: UserService) {}
  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signUpForm.value);
    this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value,
        username: this.signUpForm.get('username')?.value,
      };
      this.userService.create(user).then(_ => {
        console.log('User added successfully.');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });
  }



}

