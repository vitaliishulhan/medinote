import { createSelector } from "@ngrx/store";
import type { IAppState } from "../app-state.model";

export const selectMedicine = (state: IAppState) => state.medicine;

export const selectMedicines = createSelector(selectMedicine, (medicine) => medicine.medicines);