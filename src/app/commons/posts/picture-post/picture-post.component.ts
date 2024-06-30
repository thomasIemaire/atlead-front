import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-picture-post',
    templateUrl: 'picture-post.component.html',
    styleUrls: ['picture-post.component.scss'],
})
export class PicturePostComponent implements OnInit {
    @Input({ required: true }) idPost: number = 0;

    constructor() { }

    ngOnInit() { }
}