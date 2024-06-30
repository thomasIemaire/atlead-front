import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-search-view',
    templateUrl: './search-view.component.html',
    styleUrls: ['./search-view.component.scss'],
})
export class SearchViewComponent implements OnInit {

    public users: any[] = [];
    public filteredUsers: any[] = [];
    public searchValue: string = '';

    constructor(
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService
    ) { }

    ngOnInit() { }

    onSearchChange(): void {
        this.searchUser();
    }

    private searchUser() {
        const token: string | null = this.tokenService.getToken();
        const data = {
            username: ''
        };

        if (token) {
            this.userService.callSearchUser(token, data).subscribe(
                response => {
                    this.users = response.users;
                    this.filteredUsers = this.users.filter(user => user.username.toLowerCase().includes(this.searchValue.toLowerCase()));
                },
                error => {
                    console.error(error);
                }
            )
        }
    }

    public goToAccount(identifiant: string): void {
        this.router.navigate(['user', identifiant]);
    }
}