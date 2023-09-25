import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MedinoteDialogComponent } from '../_medinote-dialog/medinote-dialog.component';
import { Medicine } from '@app-types';


export type TAddDialogData = Omit<Medicine, 'id'>;

@Component({
  standalone: true,
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MedinoteDialogComponent,
  ],
})
export class AddDialogComponent {
  public newData: TAddDialogData = {
    name: '',
    activeFluid: '',
    dosage: '',
    note: '',
  };
}
