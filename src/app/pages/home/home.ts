import { Component, OnInit } from '@angular/core';
import { Artisan, Artisans } from '../../services/artisans';
import { CommonModule } from '@angular/common';
import { ArtisanCardMini } from "../../components/artisan-card-mini/artisan-card-mini";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ArtisanCardMini],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  topArtisans: Artisan[] = [];

  constructor(private artisans: Artisans) {}

  ngOnInit(): void {
    // S’abonne au flux "filtré" du service
    // → automatiquement mis à jour selon la recherche ou par défaut les tops
    this.artisans.getFilteredArtisans().subscribe(results => {
      this.topArtisans = results;
    });
  }
}