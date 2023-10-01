import { createReducer, on } from "@ngrx/store";
import { Medicine } from "@app-types";
import * as MedicineActions from '../actions/medicine.actions';

export interface IMedicinesState {
  medinotes: Medicine[];
}

export const initialState: IMedicinesState = {
  medinotes: []
}

export const medicineReducer = createReducer(
  initialState,
  on(MedicineActions.loadMedicines, (state, { medinotes }) => {
    const sorted = medinotes.slice().sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );

    return {
      ...state,
      medinotes: sorted
    };
}));