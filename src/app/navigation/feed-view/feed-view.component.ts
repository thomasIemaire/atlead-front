import { Component, OnInit } from '@angular/core';
import { AdviceService } from 'src/app/services/advice.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
    selector: 'app-feed-view',
    templateUrl: './feed-view.component.html',
    styleUrls: ['./feed-view.component.scss'],
})
export class FeedViewComponent implements OnInit {

    public feedIsLoaded: boolean = false;
    public advices: any[] = [];
    public token: string | null = '';

    constructor(
        private tokenService: TokenService,
        private adviceService: AdviceService
    ) { }

    ngOnInit() {
        this.token = this.tokenService.getToken();
        this.getAllPosts();
    }

    public getAllPosts(event: any = null): void {
        if (this.token) {
            this.feedIsLoaded = false;
            this.advices = [];
            this.adviceService.callGetAllAdvices(this.token).subscribe(
                response => {
                    this.advices = response.advices;
                    this.feedIsLoaded = true;
                    if(event) event.target.complete();
                },
                error => {
                    console.error(error);
                }
            )
        }
    }
}