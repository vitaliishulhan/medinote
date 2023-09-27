import { Component, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { AddDialogComponent } from '@components/dialogs/add-dialog/add-dialog.component';
import { SearchDialogComponent } from '@components/dialogs/search-dialog/search-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Medicine } from '@app-types';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@/app/store/app-state.model';
import { selectSearchQuery } from '@/app/store/selectors/seach.selector';
import * as SearchActions from '@/app/store/actions/search.actions';
import { FirebaseService } from '@/app/services/firebase/firebase.service';

@Component({
  standalone: true,
  imports: [NgIf, MatButtonModule, MatDialogModule, AddDialogComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  public searchValue = '';
  private storeSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private store: Store<IAppState>,
    private firebaseService: FirebaseService,
  ) {
    this.storeSubscription = this.store
      .pipe(select(selectSearchQuery))
      .subscribe((q) => {
        this.searchValue = q;
      });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  search() {
    this.dialog
      .open(SearchDialogComponent)
      .afterClosed()
      .subscribe((data: Data) => {
        if (data) {
          this.store.dispatch(SearchActions.search(data));
        }
      });
  }

  cancel() {
    this.store.dispatch(SearchActions.reset());
  }

  createMedicine() {
    this.dialog
      .open<AddDialogComponent, never, Omit<Medicine, 'id'> | null | undefined>(
        AddDialogComponent
      )
      .afterClosed()
      .subscribe((data) => {
        if (data) {
            this.firebaseService.addMedicine(data);
        }
      });
  }
}

type Data = { query: string; propositions: Medicine[] } | undefined;