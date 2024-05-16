import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySongsPageComponent } from './my-songs-page.component';

describe('MySongsPageComponent', () => {
  let component: MySongsPageComponent;
  let fixture: ComponentFixture<MySongsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MySongsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySongsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
