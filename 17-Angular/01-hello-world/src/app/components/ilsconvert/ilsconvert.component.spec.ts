import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ILSConvertComponent } from './ilsconvert.component';

describe('ILSConvertComponent', () => {
  let component: ILSConvertComponent;
  let fixture: ComponentFixture<ILSConvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ILSConvertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ILSConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
