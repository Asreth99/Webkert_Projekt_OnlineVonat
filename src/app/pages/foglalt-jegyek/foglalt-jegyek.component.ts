import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/shared/services/booking.service';
import { Items } from 'src/app/shared/services/models/Items';

@Component({
  selector: 'app-foglalt-jegyek',
  templateUrl: './foglalt-jegyek.component.html',
  styleUrls: ['./foglalt-jegyek.component.scss']
})
export class FoglaltJegyekComponent implements OnInit {

  displayedColumns: string[] = ['from', 'to','departure','arrival','startDate','returnDate', 'ar'];
  bookings: Items[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }

}
