import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Cities } from 'src/app/shared/services/models/Cities';


@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private firestore: AngularFirestore) { }

  getCities(fromCity: string, toCity: string): Observable<Cities[]> {
    return this.firestore.collection<Cities>('Cities', ref => ref.where('from', '==', fromCity).where('to', '==', toCity).orderBy('schedule.departure', 'asc').orderBy('schedule.arrival', 'asc')).valueChanges();
  }

}
