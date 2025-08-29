import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Artisans, Artisan } from '../../services/artisans';
import { ArtisanCardMini } from '../../components/artisan-card-mini/artisan-card-mini';

@Component({
  selector: 'app-artisans-list',
  standalone: true,
  imports: [CommonModule, ArtisanCardMini],
  templateUrl: './artisans-list.html',
  styleUrls: ['./artisans-list.css']
})
export class ArtisansList implements OnInit {
  artisans$!: Observable<Artisan[]>;

  constructor(private artisansService: Artisans) {}

  ngOnInit() {
    this.artisans$ = this.artisansService.getFilteredArtisans();
  }
}
