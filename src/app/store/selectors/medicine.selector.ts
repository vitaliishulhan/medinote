import { createSelector } from "@ngrx/store";
import type { IAppState } from "../app-state.model";

export const selectMedicine = (state: IAppState) => state.medinotes;

export const selectMedicines = createSelector(selectMedicine, ({ medinotes }) => medinotes);