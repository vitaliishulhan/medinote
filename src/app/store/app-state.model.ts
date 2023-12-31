import type { ISearchState } from "./reducers/seach.reducer";
import type { IMedicinesState } from "./reducers/medicine.reducer";

export interface IAppState {
  medinotes: IMedicinesState;
  search: ISearchState;
}