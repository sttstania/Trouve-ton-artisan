import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artisan, Artisans } from '../../services/artisans';
import { CommonModule } from '@angular/common';
import { ArtisanCardMini } from '../../components/artisan-card-mini/artisan-card-mini';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [CommonModule, ArtisanCardMini],
  templateUrl: './categorie.html',
  styleUrls: ['./categorie.css']
})
export class Categorie implements OnInit {
  categorie!:string;                    // la catégorie extraite de l’URL
  artisansList: Artisan[] = [];            // tableau qui contiendra les artisans filtrés

  constructor(
    private route: ActivatedRoute,     // injection d'ActivatedRoute pour lire l’URL
    private artisans: Artisans         // injection du service Artisans pour récupérer les données
  ) {}


  ngOnInit() {
    // On s'abonne aux changements de paramètres dans l'URL
    this.route.paramMap.subscribe(params => {

      // récupère la valeur du paramètre "nom" de l'URL; Si aucun paramètre => chaîne vide par défaut
      this.categorie = params.get('categorie') || '';
       // appelle le service pour récupérer les artisans correspondant à la catégorie;  getByCategorie renvoie un Observable<Artisan[]>
      this.artisans.getByCategorie(this.categorie).subscribe(data => {
         // stocke la liste filtrée dans la variable du composant
        this.artisansList = data;
      });
    });
  }
}
