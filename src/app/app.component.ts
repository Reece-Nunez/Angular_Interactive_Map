import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  capitalCity: string | undefined;
  countryName: string | undefined;
  countryRegion: string | undefined;
  incomeLevel: string | undefined;
  lat: string | undefined;
  long: string | undefined;
  lendingType: string | undefined;

  onCapitalCityChange(newCapital: any) {
    this.capitalCity = newCapital;
  }

  onCountryNameChange(newCountryName: any) {
    this.countryName = newCountryName;
  }

  onCountryRegionChange(newCountryRegion: any) {
    this.countryRegion = newCountryRegion;
  }

  onIncomeLevelChange(newIncomeLevel: any) {
    this.incomeLevel = newIncomeLevel;
  }

  onLatChange(newLat: any) {
    this.lat = newLat;
  }

  onLongChange(newLong: any) {
    this.long = newLong;
  }

  onLendingTypeChange(newLendingType: any) {
    this.lendingType = newLendingType;
  }



}
