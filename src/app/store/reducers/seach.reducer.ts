import { createReducer, on } from "@ngrx/store";
import * as SearchActions from "../actions/search.actions";
import { Medicine } from "@app-types";

export interface ISearchState {
  query: string;
  propositions: Medicine[];
}

export const initialState: ISearchState = {
  query: '',
  propositions: []
};

export const search = createReducer(
  initialState,
  on(SearchActions.search, (state, { query, propositions }) => {
    return {
      query,
      propositions
    }
  }),
  on(SearchActions.reset, (_, __) => initialState)
);
