import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AddDialogComponent } from '@components/dialogs/add-dialog/add-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Medicine } from '@app-types';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    AddDialogComponent
  ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
constructor(
  public dialog: MatDialog
) {}

  @Input() isSearching = false;

  createMedicine() {
    this.dialog.open<AddDialogComponent, never, Omit<Medicine, 'id'> | null | undefined>(AddDialogComponent);
  }
}
