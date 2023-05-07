import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { BookingService } from 'src/app/shared/services/booking.service';
import { Items } from 'src/app/shared/services/models/Items';



@Component({
  selector: 'app-kosar',
  templateUrl: './kosar.component.html',
  styleUrls: ['./kosar.component.scss']
})
export class KosarComponent {
  items: Items[] = [];
  

  constructor(private cartService: CartService, private bookingService: BookingService) { }

  ngOnInit(): void {
    const items$ = this.cartService.getItems();
    if (items$) {
      items$.subscribe(items => {
        this.items = items;
      });
    }
  }

  deleteItem(item: Items) { 
    this.cartService.deleteItem(item);
  }

  async saveBooking(item: Items) {
    if (this.items.length === 0) {
      console.log('A kosár üres!');
      return;
    }
  
    try {
      await this.bookingService.addBooking(item);
      console.log('Sikeres mentés!');
      this.deleteItem(item);
    } catch (error) {
      console.error('Hiba történt a mentés során:', error);
    }
  }

}
