import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AddDialogComponent } from '@components/dialogs/add-dialog/add-dialog.component';
import { SearchDialogComponent } from '@components/dialogs/search-dialog/search-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Medicine } from '@app-types';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@/app/store/app-state.model';
import { selectSearchQuery } from '@/app/store/selectors/seach.selector';
import * as SearchActions from '@/app/store/actions/search.actions';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, AddDialogComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public searchValue = '';

  constructor(public dialog: MatDialog, private store: Store<IAppState>) {}


  ngOnInit(): void {
    this.store.pipe(select(selectSearchQuery)).subscribe((q) => {
      this.searchValue = q;
    });
  }

  search() {
    this.dialog.open(SearchDialogComponent).afterClosed().subscribe((data: Data) => {
      if (data) {
        this.store.dispatch(SearchActions.search(data))
      }
    });
  }

  cancel() {
    this.store.dispatch(SearchActions.reset());
  }

  createMedicine() {
    this.dialog.open<
      AddDialogComponent,
      never,
      Omit<Medicine, 'id'> | null | undefined
    >(AddDialogComponent);
  }
}

type Data = { query: string; propositions: Medicine[] } | undefined;