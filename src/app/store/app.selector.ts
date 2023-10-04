import type { IAppState } from "./app-state.model";

export const selectTableData = (state: IAppState) => ({
  search: state.search,
  medicines: state.medinotes.medinotes
});