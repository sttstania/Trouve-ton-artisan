import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Artisans } from '../../services/artisans';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterModule, CommonModule, SearchBar],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  isMenuOpen = false;
  isSearchOpen = false;

  constructor(private artisans: Artisans, private router: Router) {};

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) this.isSearchOpen = false;
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) this.isMenuOpen = false;
  }

  onSearchChanged(term: string) {
    this.artisans.setSearch(term); // met à jour le flux

    // si le terme n'est pas vide, on navigue vers la page liste
  if (term && term.trim() !== '') {
    this.router.navigate(['/artisans']);
  }
  };

  //fermer menu si clic a l'exterieur
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menu = document.getElementById('menu-mobile');
    const button = document.querySelector('button[aria-controls="menu-mobile"]');

    if (this.isMenuOpen && menu && !menu.contains(target) && button && !button.contains(target)) {
      this.isMenuOpen = false;

    }
  }
}
