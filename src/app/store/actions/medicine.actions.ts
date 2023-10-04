import { createAction, props } from '@ngrx/store';
import { Medicine } from '@app-types';

export const loadMedicines = createAction(
  '[Medicine] Load',
  props<{ medinotes: Medicine[] }>()
);

export const addMedicine = createAction(
  '[Medicine] Add',
  props<{ medinote: Medicine }>()
);

export const updateMedicine = createAction(
  '[Medicine] Update',
  props<{ medinote: Medicine }>()
);

export const deleteMedicine = createAction(
  '[Medicine] Delete',
  props<{ id: string }>()
);
