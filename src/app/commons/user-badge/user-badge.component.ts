import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-badge',
    templateUrl: 'user-badge.component.html',
    styleUrls: ['user-badge.component.scss'],
})
export class UserBadgeComponent implements OnInit {

    @Input({ required: true }) content: string = '';
    @Input() backgroundColor: string = '#da4343';
    @Input() color: string = '#f9f9f9';

    constructor() { }

    ngOnInit() { }
}