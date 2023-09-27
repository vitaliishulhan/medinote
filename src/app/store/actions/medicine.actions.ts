import { createAction, props } from "@ngrx/store";
import { Medicine } from "@app-types";

export const loadMedicines = createAction(
  '[Medicine] Load',
  props<{ medinotes: Medicine[] }>()
);