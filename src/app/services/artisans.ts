import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Définition d'une interface Artisan, type correctement toutes les données
export interface Artisan {
  id: string;
  name: string;
  specialty: string;
  note: string;
  location: string;
  about: string;
  email: string;
  website?: string;
  category: string;
  top: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class Artisans {
  // chemin vers dichier json
  private dataUrl = 'assets/datas.json';

  constructor(private http: HttpClient) {}

  // récupérer les artisans; requete assync => il faut s'abonner dans le composant pour récupérer les données
  getArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.dataUrl);
  }
}
