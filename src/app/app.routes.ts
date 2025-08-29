import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ArtisanDetail } from './pages/artisan-detail/artisan-detail';
import { Categorie } from './pages/categorie/categorie';  
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { ArtisansList } from './pages/artisans-list/artisans-list';

export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'categorie/:categorie', component: Categorie },
    { path: 'artisan/:id', component: ArtisanDetail },
    { path: 'artisans', component: ArtisansList },
    { path: '**', component: PageNotFound }
];
