import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdviceService } from 'src/app/services/advice.service';
import { TokenService } from 'src/app/services/token.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
    selector: 'app-user-advice-content',
    templateUrl: './user-advice-content.component.html',
    styleUrls: ['./user-advice-content.component.scss'],
})
export class UserAdviceContentComponent implements OnInit {

    public identifiant: string | null = '';
    public feedLoading: boolean = false;
    public advices: any[] = [];
    public token: string | null = '';

    constructor(
        private route: ActivatedRoute,
        private tokenService: TokenService,
        private adviceService: AdviceService,
        private urlService: UrlService
    ) { }

    ngOnInit() {
        this.identifiant = this.urlService.getIdentifiant();
        
        this.token = this.tokenService.getToken();
        this.getAllPostsByUser();
    }

    public getAllPostsByUser(event: any = null): void {
        if (this.token && this.identifiant) {
            this.adviceService.callGetUserAdvices(this.token, this.identifiant).subscribe(
                response => {                   
                    this.advices = response.advices;
                    this.feedLoading = true;
                    if(event) event.target.complete();
                },
                error => {
                    console.error(error);
                }
            )
        }
    }
}