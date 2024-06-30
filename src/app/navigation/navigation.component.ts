import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    constructor(
        private router: Router,
        public userService: UserService,
    ) { }

    ngOnInit(): void { }

    public goToFeed(): void {
        this.router.navigate(['feed']);
    }

    public goToSearch(): void {
        this.router.navigate(['search']);
    }

    public goToUser(): void {
        this.router.navigate(['user', this.userService.getIdentifiant()]);
    }

    public getUserUrl(): string {
        return `/user/${this.userService.getIdentifiant()}`;
    }
}
