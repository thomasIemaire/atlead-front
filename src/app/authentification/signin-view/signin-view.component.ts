import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-signin-view',
  templateUrl: './signin-view.component.html',
  styleUrls: ['./signin-view.component.scss'],
})
export class SigninViewComponent implements OnInit {

  public identifiant: string = '';
  public password: string = '';

  public error: string = '';

  public showPassword: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() { }

  public back(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
    const passwordElement: any = document.getElementById('Password');
    if (this.showPassword && passwordElement)
      passwordElement.type = "text";
    else
      passwordElement.type = "password";
  }

  public signin() {
    let inputsAreValids: boolean = true;

    if (this.identifiant === '' || this.password === '') {
      inputsAreValids = false;
    }

    if (inputsAreValids) {
      const data = {
        identifiant: this.identifiant,
        password: this.password
      };

      this.userService.callSignin(data).subscribe(
        response => {
          const token = response.token;
          const user = response.user;

          if (token) {
            this.tokenService.setToken(token);
            this.localStorageService.setItem('token', token);
          }

          this.userService.setUser(
            {
              identifiant: user.identifiant,
              username: user.username,
              status: 0
            }
          );

          this.router.navigate([('/feed')]);
        },
        error => {
          this.error = error.error.message;
        }
      );
    } else {
      this.error = 'Veuiellez bien resigner tous les champs';
    }
  }

}
