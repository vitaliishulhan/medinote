import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import mock from './mock.json';

export interface Medicine {
  id: string;
  name: string;
  activeFluid: string;
  dosage: string;
  note: string;
}

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
    CommonModule,
  ],
})
export class MedicinesTableComponent {
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
    console.log(m);
  }

  deleteMedicine(m: Medicine) {
    console.log(m);
  }
}
