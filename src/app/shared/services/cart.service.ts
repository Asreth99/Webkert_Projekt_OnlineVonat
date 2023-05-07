import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Items } from 'src/app/shared/services/models/Items';
import { AuthService } from './auth.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { documentId } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsCollection: AngularFirestoreCollection<Items>;
  items: Observable<Items[]>;
  itemDoc!: AngularFirestoreDocument<Items>;

  constructor(private afs: AngularFirestore,private authService: AuthService, private firestore: AngularFirestore) {
    this.itemsCollection = this.afs.collection('Cart');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Items;
        const docId  = a.payload.doc.id;
        return { docId , ...data };
      }))
    );
  }

  getItems() {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      const itemsRef = this.afs.collection('Cart').doc(userId).collection('tickets');
      this.items = itemsRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Items;
          const docId  = a.payload.doc.id;
          return { docId , ...data };
        }))
      );
      return this.items;
    } else {
      console.log("User not logged in.");
      return null;
    }
  }
  addToCart(city: any, index: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const user = firebase.auth().currentUser;
      if (user) {
        const item: Items = {
          id: user.uid,
          from: city.from,
          to: city.to,
          ar: city.ar,
          selectedPassenger: city.selectedPassenger,
          outdate: city.outdate,
          returndate: city.returndate,
          departure: [city.schedule.departure[index]],
          arrival: [city.schedule.arrival[index]]
        };
        this.itemsCollection.doc(user.uid).collection('tickets').add(item)
          .then(() => {
            console.log("Document successfully written!");
            resolve();
          })
          .catch(error => {
            console.error("Error writing document: ", error);
            reject(error);
          });
      } else {
        console.log("User not logged in.");
        reject("User not logged in.");
      }
    });
  }
  

  deleteItem(item: Items): Promise<void> {
    const userId = this.authService.getCurrentUserId();
  
    if (!userId) {
      return Promise.reject('User not logged in.');
    }
  
    const query = this.afs.collection('Cart').doc(userId)
      .collection('tickets', ref => ref.where('id', '==', item.id));
  
    return query.get().toPromise().then((snapshot) => {
      if (snapshot && snapshot.size > 0) {
        return snapshot.docs[0].ref.delete().then(() => {
          console.log('Item successfully deleted!');
        }).catch((error) => {
          console.error('Error deleting item:', error);
          throw error;
        });
      } else {
        console.log('Item not found in Firestore.');
        return;
      }
    });
  }
/** 
  addToBookings(item: Items): Promise<void> {
    const userId = this.authService.getCurrentUserId();
  
    if (!userId) {
      return Promise.reject('User not logged in.');
    }
  
    const booking = Object.assign({}, item); // másolat készítése
  
    const bookingsRef = this.firestore.collection('Bookings');
    return bookingsRef.add(booking).then(() => {
      console.log('Booking added to Firestore!');
    }).catch((error) => {
      console.error('Error adding booking to Firestore:', error);
      throw error;
    });
  }
  */
}