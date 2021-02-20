import {PageStates} from './PageStates';

export interface ISearchResults {
  searchState: PageStates;
  results: {
    count: number;
    itemsPerPage: number;
    hasMorePages: boolean;
    currentPage: number;
    items?: any[];
    error?: object;
  };
}
