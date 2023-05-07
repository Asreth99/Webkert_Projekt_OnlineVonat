import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoglaltJegyekRoutingModule } from './foglalt-jegyek-routing.module';
import { FoglaltJegyekComponent } from './foglalt-jegyek.component';
import { FoglaltJegyekCardComponent } from './foglalt-jegyek-card/foglalt-jegyek-card.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    FoglaltJegyekComponent,
    FoglaltJegyekCardComponent
  ],
  imports: [
    CommonModule,
    FoglaltJegyekRoutingModule,
    MatTableModule
  ]
})
export class FoglaltJegyekModule { }
