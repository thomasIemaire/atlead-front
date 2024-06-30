import { Component, Input, OnInit } from '@angular/core';
import { AdviceService } from 'src/app/services/advice.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
    selector: 'app-post-advice',
    templateUrl: 'post-advice.component.html',
    styleUrls: ['post-advice.component.scss'],
})
export class PostAdviceComponent implements OnInit {

    public contentAdvice: string = '';
    public token: string | null;

    constructor(
        private adviceService: AdviceService,
        private tokenService: TokenService,
    ) {
        this.token = this.tokenService.getToken();
    }

    ngOnInit() { }

    public publish(): void {
        if (this.token) {
            const data = {
                advice: this.contentAdvice
            }
            this.adviceService.callSetAdvice(this.token, data).subscribe(
                response => {
                    this.contentAdvice = '';
                },
                error => {
                    console.error(error);
                }
            )
        }
    }
}