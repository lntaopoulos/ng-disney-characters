import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'characters',
    loadChildren: () => import('./feature/characters/characters.module').then((m) => m.CharactersModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./feature/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
