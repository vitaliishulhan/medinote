import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeleteDialogComponent, DeleteDialogData } from '@components/dialogs/delete-dialog/delete-dialog.component';
import { Medicine } from '@app-types';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import type { IAppState } from '@/app/store/app-state.model';
import { selectTableData } from '@/app/store/app.selector';


@Component({
  selector: 'app-medicines-table',
  templateUrl: './medicines-table.component.html',
  styleUrls: ['./medicines-table.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgIf,
  ],
})
export class MedicinesTableComponent implements OnInit {
  public medicines: Medicine[] = [];

  @Input() isLoading = false;

  constructor(public dialog: MatDialog, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.pipe(select(selectTableData)).subscribe((data) => {
      if (data.search.query) {
        this.medicines = data.search.propositions;
      } else {
        this.medicines = data.medicines;
      }
    });

  }

  editMedicine(m: Medicine) {
    this.dialog.open<EditDialogComponent, Medicine>(EditDialogComponent, {
      data: m,
    });
  }

  deleteMedicine(m: Medicine) {
    this.dialog.open<DeleteDialogComponent, DeleteDialogData>(
      DeleteDialogComponent,
      {
        data: {
          id: m.id,
          name: m.name,
        },
      }
    );
  }

  displayedColumns: (keyof Medicine | 'actions')[] = [
    'name',
    'activeFluid',
    'dosage',
    'note',
    'actions',
  ];
}
