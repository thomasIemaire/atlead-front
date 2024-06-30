import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UrlService } from 'src/app/services/url.service';

import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {

    @ViewChild('NavigationIndicator') navigationIndicator!: ElementRef;

    private rowid: number | null = null;
    public identifiant: string = '';
    public username: string = '';
    public subscriber: number = 0;
    public subscription: number = 0;
    public isSubscribed: boolean = false;

    public accountIsLoaded: boolean = false;
    public isMyAccount: boolean = false;

    private token: string | null = this.tokenService.getToken();

    constructor(
        private urlService: UrlService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService
    ) { }

    ngOnInit() {
        this.getUserInformations();
    }

    public getUserInformations(event: any = null): void {
        const identifiant = this.route.snapshot.params['identifiant'];
        this.urlService.setIdentifiant(identifiant);

        if (identifiant == this.userService.getIdentifiant())
            this.isMyAccount = true;

        if (this.token) {
            this.accountIsLoaded = false;
            this.userService.callProfil(this.token, identifiant).subscribe(
                response => {
                    this.rowid = response.account.rowid;
                    this.identifiant = response.account.identifiant;
                    this.username = response.account.username;
                    this.subscriber = response.account.subscriber;
                    this.subscription = response.account.subscription;
                    this.isSubscribed = response.account.isSubscribed;
                    this.accountIsLoaded = true;

                    if (event) event.target.complete();
                },
                error => {
                    console.error(error);
                }
            );
        }
    }

    public goToAdvice(): void {
        this.router.navigate(['advice'], { relativeTo: this.route });
        this.setIndicatorPosition('0%');
    }

    public goToPicture(): void {
        this.router.navigate(['picture'], { relativeTo: this.route });
        this.setIndicatorPosition('50%');
    }

    private setIndicatorPosition(position: string): void {
        this.navigationIndicator.nativeElement.style.left = position;
    }

    public subscribe(): void {
        this.isSubscribed = true;
        this.subscriber += 1;

        const data = {
            rowidTo: this.rowid
        }

        if (this.token) {
            this.userService.callSubsribe(this.token, data).subscribe(
                response => {
                },
                error => {
                    this.isSubscribed = false;
                    this.subscriber -= 1;
                }
            );
        }
    }

    public unsubscribe(): void {
        this.isSubscribed = false;
        this.subscriber -= 1;

        const data = {
            rowidTo: this.rowid
        }

        if (this.token) {
            this.userService.callUnsubsribe(this.token, data).subscribe(
                response => {
                },
                error => {
                    this.isSubscribed = true;
                    this.subscriber += 1;
                }
            );
        }
    }
}