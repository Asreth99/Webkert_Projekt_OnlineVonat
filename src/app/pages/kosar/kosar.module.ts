import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KosarRoutingModule } from './kosar-routing.module';
import { KosarComponent } from './kosar.component';
import {MatButtonModule} from '@angular/material/button';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    KosarComponent
  ],
  imports: [
    CommonModule,
    KosarRoutingModule,
    MatButtonModule,
    AngularFireModule,
    AngularFirestoreModule
  ]
})
export class KosarModule { }
