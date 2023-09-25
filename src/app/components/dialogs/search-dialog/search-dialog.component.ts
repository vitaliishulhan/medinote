
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor } from '@angular/common';
import { Store, select } from '@ngrx/store';
import type { Subscription } from 'rxjs';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MedinoteDialogComponent } from '../_medinote-dialog/medinote-dialog.component';
import type { Medicine } from '@app-types';
import { IAppState } from '@/app/store/app-state.model';
import { selectMedicines } from '@/app/store/selectors/medicine.selector';
import { search as SearchAction } from '@/app/store/actions/search.actions';


@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MedinoteDialogComponent,
    NgFor
  ],
})
export class SearchDialogComponent implements OnInit, OnDestroy {
  public search = '';
  public medicineSubscription: Subscription | undefined;
  public medicines: Medicine[] = [];
  public propositions: Medicine[] = [];


  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    private store: Store<IAppState>,
  ) {}

  ngOnInit(): void {
      this.medicineSubscription = this.store.pipe(select(selectMedicines)).subscribe((ms) => {
        this.medicines = ms;
      })
  }

  ngOnDestroy(): void {
      this.medicineSubscription?.unsubscribe();
  }

  searchChange(search: string) {
    if (search.length > 2) { 
      this.propositions = this.medicines.filter(({ name }) => this.levenshteinDistance(name.toLowerCase(), search.toLowerCase()) <= 2 || name.toLowerCase().includes(search.toLowerCase()));
    } else {
      this.propositions = [];
    }
  }

  setSearchQuery(search: string) {
    this.store.dispatch(SearchAction({ query: search, propositions: this.propositions }));
    this.dialogRef.close();
  }

  private levenshteinDistance(w1: string, w2: string) {
      let len1 = w1.length,
          len2 = w2.length;

      let table = [];

      for (let i = 0; i <= len1; i++) {
          table.push(Array(len2+1).fill(0));
      }

      for (let i = 0; i <= len1; i++) {
          table[i][0] = i;
      }

      for (let i = 0; i <= len2; i++) {
          table[0][i] = i;
      }

      for (let i = 1; i <= len1; i++) {
          for (let j = 1; j <= len2; j++) {
              let cost = w1[i-1] === w2[j-1] ? 0 : 1;

              table[i][j] = Math.min(table[i-1][j] + 1,
                                    table[i][j-1] + 1,
                                    table[i-1][j-1] + cost
                                    );
          }
      }

      return table[len1][len2];
  }

  cancel() {
    this.dialogRef.close();
  }
}
