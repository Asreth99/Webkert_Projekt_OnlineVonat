import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('');
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  async login(){
    this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/home');
    }).catch(error =>{
      console.error(error);
    });
  }

  goToSignUp(): void {
    this.router.navigateByUrl('/signup');
  }
}
