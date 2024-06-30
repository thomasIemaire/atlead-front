import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-authentification',
    templateUrl: './authentification.component.html',
    styleUrls: ['./authentification.component.scss'],
})
export class AuthentificationComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() { }

    isAuthPage(): boolean {
        return this.router.url === '/authentification';
    }

    public signup(): void {
        this.router.navigate(['signup'], { relativeTo: this.route });
    }

    public signin(): void {
        this.router.navigate(['signin'], { relativeTo: this.route });
    }
}
