import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmToInchComponent } from './sm-to-inch.component';

describe('SmToInchComponent', () => {
  let component: SmToInchComponent;
  let fixture: ComponentFixture<SmToInchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmToInchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmToInchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
