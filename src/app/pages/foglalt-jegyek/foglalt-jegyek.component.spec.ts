import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoglaltJegyekComponent } from './foglalt-jegyek.component';

describe('FoglaltJegyekComponent', () => {
  let component: FoglaltJegyekComponent;
  let fixture: ComponentFixture<FoglaltJegyekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoglaltJegyekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoglaltJegyekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
