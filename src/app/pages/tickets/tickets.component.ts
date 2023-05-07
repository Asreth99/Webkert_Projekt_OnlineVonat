import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Items } from 'src/app/shared/services/models/Items';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { CartService } from 'src/app/shared/services/cart.service';



@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  citiesArray: any[] = [];
  selectedPassenger: string = '';
  outDate: Date= new Date();
  returnDate: Date | null = null;
  constructor(private route: ActivatedRoute, private authService: AuthService, private firestore: AngularFirestore, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedPassenger = params['selectedPassenger'];
      
      if (params['citiesArray']) {
        try {
          this.citiesArray = JSON.parse(params['citiesArray']);
        } catch (e) {
          console.error('Error parsing citiesArray:', e);
        }
      }
      if(params['returnDate']){
        console.log('Parameter: '+params['returnDate']);
        this.outDate = new Date(params['outDate']);
      }
 

      
      if(params['returnDate']){
        console.log('Parameter: '+params['returnDate']);
        this.returnDate = new Date(params['returnDate']);
      }
    });
  }
  addToCart(city: any, index: number) {
    if (this.selectedPassenger === 'youth-01') {
      city.ar = city.ar / 2;
      city.selectedPassenger = 'Youth(0-25)';
    } else if (this.selectedPassenger === 'senior-2') {
      city.ar= city.ar * 0.1;
      city.selectedPassenger = 'Senior(60+)';
    }else{
      city.selectedPassenger = 'Adult(26-59)';
    }
    
    city.returndate = this.returnDate;
    city.outdate = this.outDate;
    console.log(city.returnDate);
    
    
    this.cartService.addToCart(city, index);
  }

  

}
