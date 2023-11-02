import { Component, OnInit, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { CountryService } from './country.service';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {
  hoveredCountryInfo: any;
  @Output() capitalCityChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() countryNameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() countryRegionChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() incomeLevelChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() latChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() longChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() lendingTypeChange: EventEmitter<string> = new EventEmitter<string>();
  countryName: string;
  capitalCity: string;
  countryRegion: string;
  incomeLevel: string;
  lat: string;
  long: string;
  lendingType: string;
  


  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private countryService: CountryService
  ) {
    this.capitalCity = '';
    this.countryName = '';
    this.countryRegion = '';
    this.incomeLevel = '';
    this.lat = '';
    this.long = '';
    this.lendingType = '';
  }

  ngOnInit(): void {
    const svgElement = this.elRef.nativeElement.querySelector('svg');
    const paths = svgElement.querySelectorAll('path');

    paths.forEach((path: any) => {
      this.renderer.listen(path, 'mouseover', this.highlightCountry.bind(this));
      this.renderer.listen(path, 'mouseout', this.resetCountry.bind(this));
    });
  }

  highlightCountry(event: Event): void {
    const target = event.target as SVGElement;
    const countryCode = target.id;

    target.dataset['originalColor'] = target.style.fill;
    target.style.fill = 'orange';

  }

  resetCountry(event: Event): void {
    const target = event.target as SVGElement;
    target.style.fill = target.dataset['originalColor'] ?? 'black';
  }

  onCountryClick(info: any): void {
    console.log(info.target.id);
    this.countryService.getCountryInfoByName(info.target.id).subscribe({
      next: (info: any) => {
        this.hoveredCountryInfo = info;
        this.capitalCity = info[1][0].capitalCity;
        this.capitalCityChange.emit(this.capitalCity);
        this.countryName = info[1][0].name;
        this.countryNameChange.emit(this.countryName);
        this.countryRegion = info[1][0].region.value;
        this.countryRegionChange.emit(this.countryRegion);
        this.incomeLevel = info[1][0].incomeLevel.value;
        this.incomeLevelChange.emit(this.incomeLevel);
        this.lat = info[1][0].latitude;
        this.latChange.emit(this.lat);
        this.long = info[1][0].longitude;
        this.longChange.emit(this.long);
        this.lendingType = info[1][0].lendingType.value
        this.lendingTypeChange.emit(this.lendingType);
      },
      error: (err: any) => console.error('Failed to fetch country info', err),
      complete: () => console.log('Completed fetching country info')
    });
  }
}

