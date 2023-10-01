import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Medicine } from '@app-types';


export type TAddDialogData = Omit<Medicine, 'id'>;


@Component({
  standalone: true,
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
  imports: [
    NgIf,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class AddDialogComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    activeFluid: new FormControl('', [Validators.required]),
    dosage: new FormControl('', [Validators.required]),
    note: new FormControl('', []),
  });

  
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent, TAddDialogData>
  ) {}

  getErrorMessage(f: FormControl) {
    if (f.hasError('required')) {
      return 'Це поле не може бути порожнім';
    }

    return '';
  }

  confirm() {
    this.dialogRef.close({
      name: this.form.controls.name.value!,
      activeFluid: this.form.controls.activeFluid.value!,
      dosage: this.form.controls.dosage.value!,
      note: this.form.controls.note.value || '',
    })
  }

  cancel() {
    this.dialogRef.close();
  }
}
