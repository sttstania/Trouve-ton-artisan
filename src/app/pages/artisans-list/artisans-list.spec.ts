import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisansList } from './artisans-list';

describe('ArtisansList', () => {
  let component: ArtisansList;
  let fixture: ComponentFixture<ArtisansList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisansList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisansList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
