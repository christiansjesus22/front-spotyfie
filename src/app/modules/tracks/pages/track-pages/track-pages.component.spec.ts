import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackPagesComponent } from './track-pages.component';

describe('TrackPagesComponent', () => {
  let component: TrackPagesComponent;
  let fixture: ComponentFixture<TrackPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
