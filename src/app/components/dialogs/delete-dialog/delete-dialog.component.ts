import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MedinoteDialogComponent } from '../_medinote-dialog/medinote-dialog.component';

export interface DeleteDialogData {
  id: string;
  name: string;
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MedinoteDialogComponent
  ],
})
export class DeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData
  ) {}

  confirm() {
    console.log('DELETE CONFIRM', this.data);
  }
}
