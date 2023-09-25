import { Component, Input } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  selector: '[app-dialog]',
  templateUrl: './medinote-dialog.component.html',
  styleUrls: ['./medinote-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule,
  ]
})
export class MedinoteDialogComponent {
  constructor(
      public dialogRef: MatDialogRef<MedinoteDialogComponent>,
  ) {}
    
  @Input({ alias: 'dialog-close' }) dialogCloseData: unknown;

  cancel() {
    this.dialogRef.close();
  }
}
