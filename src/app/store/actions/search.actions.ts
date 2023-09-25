import { Medicine } from "@app-types";
import { createAction, props } from "@ngrx/store";

export const search = createAction('[Search Component] Search', props<{ query: string, propositions: Medicine[] }>());

export const reset = createAction('[Search Component] Reset');