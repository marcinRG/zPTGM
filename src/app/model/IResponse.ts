import {IPageState} from './IPageState';
import {PageStates} from './PageStates';

export interface IResponse extends IPageState {
  count: number;
  linkToNext?: string;
  resultsTable?: any[];
  errorMessage?: string;
}
