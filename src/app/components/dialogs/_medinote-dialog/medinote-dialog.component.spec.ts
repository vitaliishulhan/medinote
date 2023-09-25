import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedinoteDialogComponent } from './medinote-dialog.component';

describe('DialogBaseComponent', () => {
  let component: MedinoteDialogComponent
  let fixture: ComponentFixture<MedinoteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedinoteDialogComponent]
    });
    fixture = TestBed.createComponent(MedinoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
