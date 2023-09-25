import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { load as loadMedicines } from '../store/actions/medicine.actions';
import mock from './mock.json';

@Injectable({
  providedIn: 'root',
})
export class InitialDataService {
  constructor(
    // private http: HttpClient,
    private store: Store
  ) {}

  loadData() {
    this.store.dispatch(loadMedicines({ medicines: mock }));
  }
}
