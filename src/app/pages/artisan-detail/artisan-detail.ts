// Import des modules Angular et de la lib EmailJS
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artisan, Artisans } from '../../services/artisans'; // ton service qui fournit les artisans
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-artisan-detail',
  standalone: true, // composant Angular standalone (pas besoin d’être déclaré dans un module)
  imports: [CommonModule, ReactiveFormsModule], // on importe les modules nécessaires
  templateUrl: './artisan-detail.html',
  styleUrls: ['./artisan-detail.css']
})
export class ArtisanDetail implements OnInit {
  artisan!: Artisan; // artisan chargé depuis l’ID en paramètre d’URL
  stars: number[] = [1, 2, 3, 4, 5]; // pour l’affichage de la note en étoiles
  contactForm: FormGroup; // formulaire réactif Angular
  submitted = false; // indicateur pour savoir si l’utilisateur a soumis le formulaire

  constructor(
    private route: ActivatedRoute, // pour récupérer l’ID dans l’URL
    private artisanService: Artisans, // service pour récupérer les données de l’artisan
    private fb: FormBuilder, // FormBuilder : création rapide d’un formulaire réactif
    private location: Location // pour gérer le bouton retour
  ) {
    // Initialisation du formulaire avec 3 champs requis
    this.contactForm = this.fb.group({
      lastName: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    // On récupère l’ID de l’artisan depuis l’URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // On appelle le service pour chercher l’artisan correspondant
      this.artisanService.getById(id).subscribe((data: Artisan | undefined) => {
        if (data) {
          this.artisan = data; // artisan trouvé
        } else {
          console.error(`Aucun artisan trouvé avec l'ID ${id}`);
          this.goBack(); // si l’ID est invalide, retour en arrière
        }
      });
    }
  }

  // Méthode utilitaire : détermine si une étoile doit être pleine ou vide
  isStarFull(star: number): boolean {
    const noteNumber = parseFloat(this.artisan?.note ?? '0');
    return star <= noteNumber;
  }

  // On récupère la référence native du formulaire HTML (grâce à #contactFormRef dans le template)
  @ViewChild('contactFormRef') contactFormRef!: ElementRef<HTMLFormElement>;

  // Méthode appelée quand on soumet le formulaire
  sendMessage() {
    this.submitted = true; // permet d’activer l’affichage des erreurs dans le template

    // On ne tente l’envoi que si le formulaire est valide et qu’un artisan est chargé
    if (this.contactForm.valid && this.artisan) {
      emailjs.sendForm(
        'service_hif81pf',           // ID du service EmailJS (fourni par ton compte)
        'template_2xq1y6y',          // ID du template EmailJS
        this.contactFormRef.nativeElement, // référence DOM du <form>, récupérée via @ViewChild
        'WVnWLrYYC9YBnZL34'          // clé publique EmailJS
      ).then(() => {
          // Succès : message envoyé
          alert(`Message envoyé à ${this.artisan.name} !`);
          this.contactForm.reset(); // on vide le formulaire
          this.submitted = false;   // on remet l’état "non soumis"
        }, (error: any) => {
          // Erreur : affichage console + alerte utilisateur
          console.error('FAILED...', error);
          alert("Erreur lors de l'envoi du message.");
        });
    }
  }

  // Bouton retour → on navigue à la page précédente
  goBack() {
    this.location.back();
  }
}
