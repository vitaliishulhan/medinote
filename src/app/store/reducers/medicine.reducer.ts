import { createReducer, on } from "@ngrx/store";
import { Medicine } from "@app-types";
import * as MedicineActions from '../actions/medicine.actions';

export interface IMedicinesState {
  medicines: Medicine[];
}

export const initialState: IMedicinesState = {
  medicines: []
}

export const medicineReducer = createReducer(
  initialState,
  on(MedicineActions.load, (state, { medicines }) => ({
    ...state,
    medicines
  }))
);