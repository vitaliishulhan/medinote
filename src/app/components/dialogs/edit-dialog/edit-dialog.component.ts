import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MedinoteDialogComponent } from '../_medinote-dialog/medinote-dialog.component';
import { Medicine } from '@app-types';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MedinoteDialogComponent,
  ],
})
export class EditDialogComponent {
  public newData: Medicine;
  public name: string;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Medicine
  ) {
    this.newData = {...data};
    this.name = data.name;
  }

  cancel() {
    this.dialogRef.close();
  }
}
