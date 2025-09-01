import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-blank-layout',  
  standalone: true,
  imports: [ RouterModule], 
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class BlankLayout {}
