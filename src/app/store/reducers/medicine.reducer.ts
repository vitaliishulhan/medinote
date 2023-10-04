import { createReducer, on } from '@ngrx/store';
import { Medicine } from '@app-types';
import * as MedicineActions from '../actions/medicine.actions';

const sortFromAtoZ = (a: Medicine, b: Medicine) =>
  a.name.toLowerCase().localeCompare(b.name.toLowerCase());

export interface IMedicinesState {
  medinotes: Medicine[];
}

export const initialState: IMedicinesState = {
  medinotes: [],
};

export const medicineReducer = createReducer(
  initialState,
  on(MedicineActions.loadMedicines, (state, { medinotes }) => {
    const sorted = medinotes.slice().sort(sortFromAtoZ);

    return {
      ...state,
      medinotes: sorted,
    };
  }),
  on(MedicineActions.addMedicine, (state, { medinote }) => {
    const sorted = state.medinotes
      .slice()
      .concat([medinote])
      .sort(sortFromAtoZ);

    return {
      ...state,
      medinotes: sorted,
    };
  }),
  on(MedicineActions.updateMedicine, (state, { medinote }) => {
    const updatedMedinoteIndex = state.medinotes.findIndex(({ id }) => id === medinote.id);

    if (updatedMedinoteIndex === -1) {
      console.error(`[Medicine Reducer -> update medicine] There is no such medinote with id "${medinote.id}"`);

      return state;
    }

    const newMedinotes = state.medinotes.slice();

    newMedinotes.splice(updatedMedinoteIndex, 1, medinote);

    return {
      ...state,
      medinotes: newMedinotes.sort(sortFromAtoZ)
    };
  }),
  on(MedicineActions.deleteMedicine, (state, { id: medinoteId }) => {
    const deletedMedinoteIndex = state.medinotes.findIndex(({ id }) => id === medinoteId);

    if (deletedMedinoteIndex === -1) {
      console.error(`[Medicine Reducer -> delete medicine] There is no such medinote with id "${medinoteId}"`);

      return state;
    }

    const newMedinotes = state.medinotes.slice();

    newMedinotes.splice(deletedMedinoteIndex, 1);

    return {
      ...state,
      medinotes: newMedinotes
    };
  })
);
