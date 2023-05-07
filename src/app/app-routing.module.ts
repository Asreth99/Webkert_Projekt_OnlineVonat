import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: 'home',
  loadChildren: () => import('./pages/home/home.module').then(m=> m.HomeModule),
  },

  {path: 'foglalt-jegyek',
  loadChildren: () => import('./pages/foglalt-jegyek/foglalt-jegyek.module').then(m=> m.FoglaltJegyekModule),
  canActivate: [AuthGuard]
  },

  {path: 'kosar',
  loadChildren: () => import('./pages/kosar/kosar.module').then(m=> m.KosarModule),
  canActivate: [AuthGuard]
  },
  
  {path: 'profil',
  loadChildren: () => import('./pages/profil/profil.module').then(m=> m.ProfilModule)
  },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
  
  { path: 'tickets', loadChildren: () => import('./pages/tickets/tickets.module').then(m => m.TicketsModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
