import {SearchStates} from './SearchStates';

export interface ISearchResults {
  searchState: SearchStates;
  results: {
    count: number;
    itemsPerPage: number;
    hasMorePages: boolean;
    currentPage: number;
    items?: any[];
    error?: object;
  };
}
