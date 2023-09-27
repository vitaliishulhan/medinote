import { Component, Input } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-dialog',
  templateUrl: './medinote-dialog.component.html',
  styleUrls: ['./medinote-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule,
  ]
})
export class MedinoteDialogComponent<T = unknown> {
  constructor(
      public dialogRef: MatDialogRef<MedinoteDialogComponent>,
  ) {}
    
  @Input({ alias: 'dialog-close' }) dialogCloseData: T | undefined;
  @Input({ alias: 'confirm' }) checkConfirm: ((data: T) => boolean) | undefined;

  confirm() {
    if (this.checkConfirm && this.checkConfirm(this.dialogCloseData!)) {
      this.dialogRef.close(this.dialogCloseData);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
