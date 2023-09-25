import { createSelector } from "@ngrx/store";
import type { IAppState } from "../app-state.model";

export const selectSearch = (state: IAppState) => state.search;

export const selectSearchQuery = createSelector(selectSearch, (search) => search.query);
