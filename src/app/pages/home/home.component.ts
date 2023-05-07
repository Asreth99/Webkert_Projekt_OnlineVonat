import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Cities } from 'src/app/shared/services/models/Cities';
import { CitiesService } from '../../shared/services/cities.service';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
interface PassengerType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cities: FormGroup;
  citiesArray: Cities[] = [];

  constructor(private router: Router, private citiesService: CitiesService, private fb: FormBuilder) {
    this.cities = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required]
    });


    this.citiesArray = [];
  this.cities.valueChanges.subscribe(values => {
    this.citiesArray.push(values);
  });
  }

  
  ngOnInit(): void {}
  onSubmit() {
    if(this.selectedOption === '1'){
      this.returnDate = null;
    }
    const fromCity = this.cities.get('from')?.value;
  const toCity = this.cities.get('to')?.value;

  this.citiesService.getCities(fromCity, toCity).subscribe((cities: Cities[]) => {
    this.citiesArray = cities;
    console.log(cities);
    this.router.navigate(['/tickets'], { 
      queryParams: { 
        citiesArray: JSON.stringify(this.citiesArray),
        selectedPassenger: this.selectedPassenger,
        outDate: this.outDate,
        returnDate: this.returnDate
      } 
    });
  }); 
  }


  selectedOption: string = '1';
  selectedPassenger: string = 'adult-1';
  outDate: Timestamp | null = null;
  returnDate: Timestamp | null = null; 
  passenger: PassengerType[] = [
    {value: 'youth-01', viewValue: 'Youth(0-25)'},
    {value: 'adult-1', viewValue: 'Adult(26-59)'},
    {value: 'senior-2', viewValue: 'Senior(60+)'},
  ];

  onPassengerSelected(event: any) {
    this.selectedPassenger = event.value;
  }
}
