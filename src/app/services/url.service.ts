import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UrlService {

    private identifiant: string = '';

    constructor() { }

    public setIdentifiant(value: string): void {
        this.identifiant = value;
    }

    public getIdentifiant(): string | null {
        if (this.identifiant === '') return null;
        return this.identifiant;
    }
}