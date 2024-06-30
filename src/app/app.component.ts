import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from './services/local-storage.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    let token = this.getToken();

    if (token) {
      this.tokenService.callToken(token).subscribe(
        response => {
          let token = response.token;
          let user = response.user;

          if (token) {
            this.tokenService.setToken(token);
            this.localStorageService.setItem('token', token);
          }

          this.userService.setUser({
            identifiant: user.identifiant,
            username: user.username,
            status: user.status
          });
          this.router.navigate(['/feed']);
        },
        error => {
          console.error("Erreur lors de la reconnexion", error);
          this.router.navigate(['']);
        }
      )
    }
  }

  public getToken(): string | null {
    return this.tokenService.getToken();
  }
}