import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeleteDialogComponent, DeleteDialogData } from '@components/dialogs/delete-dialog/delete-dialog.component';
import { Medicine } from '@app-types';
import mock from './mock.json';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';


const ELEMENT_DATA: Medicine[] = mock;

/**
 * @title Basic use of `<table mat-table>`
 */
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
export class MedicinesTableComponent {
  constructor(
    public dialog: MatDialog
  ) {}

  displayedColumns: (keyof Medicine | 'actions')[] = [
    'name',
    'activeFluid',
    'dosage',
    'note',
    'actions'
  ];
  dataSource = ELEMENT_DATA;

  @Input() isLoading = false;

  editMedicine(m: Medicine) {
    this.dialog.open<EditDialogComponent, Medicine>(EditDialogComponent, {
      data: m
    });
  }

  deleteMedicine(m: Medicine) {
    this.dialog.open<DeleteDialogComponent, DeleteDialogData>(DeleteDialogComponent, {
      data: {
        id: m.id,
        name: m.name
      },
    });
  }
}
