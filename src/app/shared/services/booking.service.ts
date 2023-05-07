import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Items } from './models/Items';
import { AuthService } from './auth.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  getBookingsByUserId(uid: any): any {
    throw new Error('Method not implemented.');
  }

  constructor(private firestore: AngularFirestore,private authService: AuthService) { }

  addBooking(item: Items): Promise<DocumentReference<Items>> {
    const user = firebase.auth().currentUser;
    const booking: Items = {
      id: item.id,
      from: item.from,
      to: item.to,
      ar: item.ar,
      selectedPassenger: item.selectedPassenger,
      outdate: item.outdate,
      returndate: item.returndate,
      departure: item.departure,
      arrival: item.arrival,
    };
  
    return this.firestore.collection('Bookings').doc(user?.uid).collection<Items>('items').add(booking);
  }

  getBookings(): Observable<Items[]> {
    const user = firebase.auth().currentUser;
    return this.firestore
      .collection<Items>('Bookings')
      .doc(user?.uid)
      .collection<Items>('items')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Items;
            const docId = a.payload.doc.id;
            return { docId, ...data };
          })
        )
      );
  }

  getBookingsForUser(userId: string): Observable<any> {
    return this.firestore.collection('Bookings', ref => ref.where('userId', '==', userId)).valueChanges();
  }

  deleteBooking(id: string): Promise<void> {
    return this.firestore.collection('Bookings').doc(id).delete();
  }

}
