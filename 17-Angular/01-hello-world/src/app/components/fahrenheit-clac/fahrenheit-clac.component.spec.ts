import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FahrenheitClacComponent } from './fahrenheit-clac.component';

describe('FahrenheitClacComponent', () => {
  let component: FahrenheitClacComponent;
  let fixture: ComponentFixture<FahrenheitClacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FahrenheitClacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FahrenheitClacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
