import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanCardMini } from './artisan-card-mini';

describe('ArtisanCardMini', () => {
  let component: ArtisanCardMini;
  let fixture: ComponentFixture<ArtisanCardMini>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisanCardMini]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisanCardMini);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
