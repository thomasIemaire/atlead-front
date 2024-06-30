import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdviceService } from 'src/app/services/advice.service';
import { TokenService } from 'src/app/services/token.service';
import * as moment from 'moment';

@Component({
    selector: 'app-advice-post',
    templateUrl: 'advice-post.component.html',
    styleUrls: ['advice-post.component.scss'],
})
export class AdvicePostComponent implements OnInit {
    @Input({ required: true }) rowid: number = 0;
    @Input({ required: true }) identifiant: string = '';
    @Input({ required: true }) username: string = '';
    @Input({ required: true }) contentAdvice: string = '';
    @Input({ required: true }) likes: number = 0;
    @Input({ required: true }) liked: number = 0;
    @Input({ required: true }) datetime: string = '';

    private token: string | null = '';

    constructor(
        private router: Router,
        private tokenService: TokenService,
        private adviceService: AdviceService
    ) { }

    ngOnInit() {
        this.token = this.tokenService.getToken()
    }

    public goToAccount(): void {
        this.router.navigate(['user', this.identifiant]);
    }

    public like(): void {
        this.likes += 1;
        this.liked = 1;

        if (this.token) {
            const data = {
                idAdvice: this.rowid
            }
            this.adviceService.callLikeAdvice(this.token, data).subscribe(
                response => {
                },
                error => {
                    this.likes -= 1;
                    this.liked = 0;
                    console.error(error);
                }
            )
        }
    }

    public unlike(): void {
        this.likes -= 1;
        this.liked = 0;

        if (this.token) {
            const data = {
                idAdvice: this.rowid
            }
            this.adviceService.callUnlikeAdvice(this.token, data).subscribe(
                response => {
                },
                error => {
                    this.likes += 1;
                    this.liked = 1;
                    console.error(error);
                }
            )
        }
    }

    public getElapsedTime(): string {
        const now = moment();
        const publishedDate = moment(this.datetime);
        const duration = moment.duration(now.diff(publishedDate));

        const years = duration.years();
        const months = duration.months();
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();

        if (years > 0) {
            return `${years} an${years > 1 ? 's' : ''}`;
        } else if (months > 0) {
            return `${months} mois`;
        } else if (days > 0) {
            return `${days} jour${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `${hours} heure${hours > 1 ? 's' : ''}`;
        } else {
            return `${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
    }

}