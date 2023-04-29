import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// TODO: revisit routes
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'characters',
    loadChildren: () => import('./feature/characters/characters.module').then((m) => m.CharactersModule),
  },
  // {
  //   path: 'details',
  //   loadChildren: () => import('./components/movie-details/movie-details.module').then((m) => m.MovieDetailsModule),
  // },
  {
    path: 'dashboard',
    loadChildren: () => import('./feature/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  // {
  //   path: '**',
  //   loadChildren: () => import('./components/not-found/not-found.module').then((m) => m.NotFoundModule),
  // },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
