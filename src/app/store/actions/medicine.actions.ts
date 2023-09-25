import { createAction, props } from "@ngrx/store";
import { Medicine } from "@app-types";

export const load = createAction(
  '[Medicine] Load',
  props<{ medicines: Medicine[] }>()
);