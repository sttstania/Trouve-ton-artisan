import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs';


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

  // Subject réactif qui stocke le terme de recherche courant
  // BehaviorSubject = il garde la dernière valeur et la redonne à tout nouvel abonné
   private searchTerm$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  // récupérer les artisans; requete assync => il faut s'abonner dans le composant pour récupérer les données
  getArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.dataUrl);
  }

  // filtre par catégorie (string) ; recupere artisans (getArtisans);
  // applique un map pour transformer la liste (garde seulement ceux de la liste correspondante)
  // retourne : Oservable<Artisan[]>
  getByCategorie(categorie: string): Observable<Artisan[]> {
    return this.getArtisans().pipe(
      map(all =>
        all.filter(a =>
          this.normalizeText(a.category) === this.normalizeText(categorie)
        )
      )
    );
  }
  /**
   * Récupère un artisan précis via son ID
   */
  getById(id: string): Observable<Artisan | undefined> {
    return this.getArtisans().pipe(
      map(all => all.find(a => a.id === id))
    );
  }

  /**
   * Met à jour le terme de recherche (appelé depuis le Header)
   */
  setSearch(term: string): void {
    this.searchTerm$.next(term);
  }

  /**
   * Retourne les artisans filtrés dynamiquement
   * - Si pas de recherche → artisans top (max 3)
   * - Sinon → artisans filtrés par nom, spécialité ou localisation
   */
  getFilteredArtisans(): Observable<Artisan[]> {
    return combineLatest([this.getArtisans(), this.searchTerm$]).pipe(
      map(([all, term]) => {
        const normalized = this.normalizeText(term);

        if (!normalized) {
          // aucun terme saisi → on renvoie les artisans top (3 max)
          return all.filter(a => a.top).slice(0, 3);
        }
 // filtre par nom, spécialité, ou localisation
        return all.filter(a =>
          this.normalizeText(a.name).includes(normalized) ||
          this.normalizeText(a.specialty).includes(normalized) ||
          this.normalizeText(a.location).includes(normalized)
        );
      })
    );
  }

  /**
   * Normalise une chaîne de texte
   * - supprime les accents
   * - passe en minuscule
   */
  private normalizeText(str: string): string {
    return str
      .normalize('NFD') // ex: é → e + accent
      .replace(/[\u0300-\u036f]/g, '') // supprime les accents
      .toLowerCase();
  }
}