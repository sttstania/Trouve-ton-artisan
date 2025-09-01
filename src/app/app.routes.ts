import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ArtisanDetail } from './pages/artisan-detail/artisan-detail';
import { Categorie } from './pages/categorie/categorie';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { ArtisansList } from './pages/artisans-list/artisans-list';
import { MentionsLegales } from './pages/mentions-legales/mentions-legales';
import { Cookies } from './pages/cookies/cookies';
import { DonneesPersonnelles } from './pages/donnees-personnelles/donnees-personnelles';
import { Accessibilite } from './pages/accessibilite/accessibilite';
import { Layout } from './layouts/layout/layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      { path: 'categorie/:categorie', component: Categorie },
      { path: 'artisan/:id', component: ArtisanDetail },
      { path: 'artisans', component: ArtisansList },
    ]
  },
  {
    path: '',
    component: BlankLayout,
    children: [
      { path: 'mentions-legales', component: MentionsLegales },
      { path: 'cookies', component: Cookies },
      { path: 'accessibilite', component: Accessibilite },
      { path: 'donnees-personnelles', component: DonneesPersonnelles },
    ]
  },
  // Route catch-all pour PageNotFound
  { path: '**', component: PageNotFound }
];
