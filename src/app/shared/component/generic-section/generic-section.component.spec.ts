import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSectionComponent } from './generic-section.component';

describe('GenericSectionComponent', () => {
  let component: GenericSectionComponent;
  let fixture: ComponentFixture<GenericSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
