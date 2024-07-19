import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MToFeetComponent } from './mto-feet.component';

describe('MToFeetComponent', () => {
  let component: MToFeetComponent;
  let fixture: ComponentFixture<MToFeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MToFeetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MToFeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
