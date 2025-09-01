import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneesPersonnelles } from './donnees-personnelles';

describe('DonneesPersonnelles', () => {
  let component: DonneesPersonnelles;
  let fixture: ComponentFixture<DonneesPersonnelles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonneesPersonnelles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonneesPersonnelles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
