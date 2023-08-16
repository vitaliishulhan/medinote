import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesTableComponent } from './medicines-table.component';

describe('MedicinesTableComponent', () => {
  let component: MedicinesTableComponent;
  let fixture: ComponentFixture<MedicinesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicinesTableComponent]
    });
    fixture = TestBed.createComponent(MedicinesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
