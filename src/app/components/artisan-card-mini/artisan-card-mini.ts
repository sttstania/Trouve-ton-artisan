import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Artisan } from '../../services/artisans';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-artisan-card-mini',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artisan-card-mini.html',
  styleUrls: ['./artisan-card-mini.css']
})
export class ArtisanCardMini {
   @Input() artisan!: Artisan;
  @Input('aria-label') ariaLabel?: string;

  stars: number[] = [1,2,3,4,5];

  isStarFull(star: number): boolean {
    const noteNumber = parseFloat(this.artisan?.note ?? '0');
    return star <= noteNumber;
  }
}
