import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MedinoteDialogComponent } from '../_medinote-dialog/medinote-dialog.component';
import { Medicine, TErrors } from '@app-types';


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
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MedinoteDialogComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDialogComponent {
  public newData: TAddDialogData = {
    name: '',
    activeFluid: '',
    dosage: '',
    note: '',
  };

  public errors: TErrors<TAddDialogData> = {
    name: 'Here'
  }; 

  check(data: TAddDialogData) {
    this.errors = {};

    if (!data.name) {
      this.errors.name = 'Назва препарату не може бути пустою';
    }

    if (!data.activeFluid) {
      this.errors.activeFluid = 'Активна речовина має бути подана';
    }

    if (!data.dosage) {
      this.errors.dosage = 'Дозування має бути описане';
    }

    const isErrors = !!Object.keys(this.errors).length;

    if (isErrors) {
      alert(Object.values(this.errors).join('\n'));
    }

    return !Object.keys(this.errors).length;
  }
}
