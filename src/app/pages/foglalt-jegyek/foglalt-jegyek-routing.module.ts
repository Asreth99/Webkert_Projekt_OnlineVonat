import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoglaltJegyekComponent } from './foglalt-jegyek.component';

const routes: Routes = [
  {path: '', component: FoglaltJegyekComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoglaltJegyekRoutingModule { }
