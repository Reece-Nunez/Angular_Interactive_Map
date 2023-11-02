import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class CountryService {
    selectedCountryInfo: any;

constructor(private http: HttpClient) {}

    getCountryInfoByName(countryName: string): Observable<any> {
        const apiUrl = `https://api.worldbank.org/v2/country/${countryName}?format=json`;
        return this.http.get<any>(apiUrl);
    }

    setSelectedCountry(countryCode: string): void {
        this.getCountryInfoByName(countryCode).subscribe({
            next: info => this.selectedCountryInfo = info,
            error: err => console.error('Failed to fetch country info', err)
        });
    }
}
