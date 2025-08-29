import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artisan, Artisans } from '../../services/artisans';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-artisan-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './artisan-detail.html',
  styleUrls: ['./artisan-detail.css']
})
export class ArtisanDetail implements OnInit {
  artisan!: Artisan;
  stars: number[] = [1, 2, 3, 4, 5];
  contactForm: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private artisanService: Artisans,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.contactForm = this.fb.group({
      lastName: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.artisanService.getById(id).subscribe((data: Artisan | undefined) => {
        if (data) {
          this.artisan = data;
        } else {
          console.error(`Aucun artisan trouvé avec l'ID ${id}`);
          this.goBack();
        }
      });
    }
  }

  isStarFull(star: number): boolean {
    const noteNumber = parseFloat(this.artisan?.note ?? '0');
    return star <= noteNumber;
  }

  sendMessage() {
    this.submitted = true;

    if (this.contactForm.valid && this.artisan) {
      const { lastName, subject, message } = this.contactForm.value;

      emailjs.send(
        'service_n24vkg6',
        'template_2xq1y6y',
        {
          lastName: this.contactForm.value.lastName,
          subject: this.contactForm.value.subject,
          message: this.contactForm.value.message,
          artisan_email: this.artisan.email,
          name: this.artisan.name,   
          time: new Date().toLocaleString()
        },
        'WVnWLrYYC9YBnZL34'
      ).then((result: any) => {
          console.log('SUCCESS!', result.status, result.text);
          alert(`Message envoyé à ${this.artisan.name} !`);
          this.contactForm.reset();
          this.submitted = false;
        }, (error: any) => {
          console.error('FAILED...', error);
          alert("Erreur lors de l'envoi du message.");
        });
    }
  }

  goBack() {
    this.location.back();
  }
}

