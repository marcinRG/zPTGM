import {Injectable} from '@angular/core';
import {combineLatest, Observable, Observer, Subject, merge, of, from} from 'rxjs';
import {debounceTime, map, catchError, switchMap, mergeMap, delay} from 'rxjs/operators';
import {fromFetch} from 'rxjs/fetch';
import {IHasTargetWithValue} from '../model/IHasTargetWithValue';
import {IHasText} from '../model/IHasText';
import {IHasCategory} from '../model/IHasCategory';
import {ILink} from '../model/ILink';
import {IPageState} from '../model/IPageState';
import {PageStates} from '../model/PageStates';
import {IResponse} from '../model/IResponse';

const URL_BASE = 'https://swapi.dev/api/';
const ERROR_RESPONSE: IResponse = {
  pageState: PageStates.ERROR,
  currentPage: 1,
  count: 0,
  resultsTable: [],
  linkToNext: null,
  errorMessage: null
};

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly searchTextInput: Subject<IHasTargetWithValue>;
  private readonly categoryInput: Subject<IHasTargetWithValue>;
  private readonly pageInput: Subject<ILink>;

  constructor() {
    this.searchTextInput = new Subject();
    this.categoryInput = new Subject();
    this.pageInput = new Subject();
  }

  changeSearchText(value: IHasTargetWithValue): void {
    this.searchTextInput.next(value);
  }

  changeCategory(value: IHasTargetWithValue): void {
    this.categoryInput.next(value);
  }

  changePage(value: ILink): void {
    this.pageInput.next(value);
  }

  getCategoryAndText(): Observable<IHasCategory & IHasText> {
    const categoryStream: Observable<IHasCategory> = changeEventToCategoryStream(this.categoryInput);
    const textStream: Observable<IHasText> = changeEventToSearchTextStream(this.searchTextInput);
    return combinedSearchTextAndCategoryStream(categoryStream, textStream);
  }

  getAppState(): Observable<IPageState> {
    const stateStream1: Observable<IPageState> = changeLinkToPageStatesStream(this.mergedLinksStream());
    const stateStream2: Observable<IPageState> = changeResponseToPageStatesStream(this.getData());
    return merge<IPageState>(stateStream1, stateStream2);
  }

  getData(): Observable<IResponse> {
    const dataFromServerStream: Observable<IResponse> = this.mergedLinksStream().pipe(mergeMap((value: ILink) => {
      return this.getDataFromServer(value.link);
    }));
    return dataFromServerStream;
  }

  private getDataFromServer(link: string): Observable<IResponse> {
    const dataStream: Observable<IResponse> = fromFetch(link).pipe(
      switchMap(response => {
        if (response.ok) {
          return from(response.json()).pipe(map((value: any) => {
            return {
              pageState: PageStates.RESULTS,
              currentPage: getPageNumber(link),
              count: value.count,
              linkToNext: value.next,
              resultsTable: value.results
            };
          }));
        } else {
          return of({
            ...ERROR_RESPONSE,
            errorMessage: `Error ${response.status}`
          });
        }
      }),
      catchError(err => {
        return of({
          ...ERROR_RESPONSE,
          errorMessage: err.message
        });
      })
    );
    return dataStream;
  }

  private mergedLinksStream(): Observable<ILink> {
    const linkStream1: Observable<ILink> = this.getCategoryAndText().pipe(
      map((event: IHasCategory & IHasText) => {
        return {
          link: createLinkFromParameters(URL_BASE, event.category, event.text)
        };
      }));
    const linkStream2: Observable<ILink> = this.pageInput;
    return merge<ILink>(linkStream1, linkStream2);
  }
}

export function createObserver<E>(next: (e: E) => void, errorMsg: string): any {
  const obj: Observer<E> = {
    next,
    error: (e) => {
      console.log(errorMsg);
      console.log(e);
    },
    complete: () => {
      console.log('completed');
    }
  };
  return obj;
}

function changeEventToSearchTextStream(searchTextInput: Observable<IHasTargetWithValue>): Observable<IHasText> {
  const textSource: Observable<IHasText> = searchTextInput.pipe(debounceTime(1000),
    map((event: IHasTargetWithValue): IHasText => {
      return {text: event.target.value};
    }));
  return textSource;
}

function changeEventToCategoryStream(categoryInput: Observable<IHasTargetWithValue>): Observable<IHasCategory> {
  const categorySource: Observable<IHasCategory> = categoryInput.pipe(debounceTime(1000),
    map((event: IHasTargetWithValue): IHasCategory => {
      return {category: event.target.value};
    }));
  return categorySource;
}

function changeResponseToPageStatesStream(responseInput: Observable<IResponse>): Observable<IPageState> {
  const pageStatesStream: Observable<IPageState> = responseInput.pipe(map((value: IResponse) => {
    return {
      pageState: value.pageState,
      currentPage: value.currentPage
    };
  }), delay(1000));
  return pageStatesStream;
}

function changeLinkToPageStatesStream(pageInput: Observable<ILink>): Observable<IPageState> {
  const pageStatesStream: Observable<IPageState> = pageInput.pipe(
    map((event: ILink): IPageState => {
      return {
        currentPage: getPageNumber(event.link),
        pageState: PageStates.LOADING
      };
    }));
  return pageStatesStream;
}

function combinedSearchTextAndCategoryStream(categorySource: Observable<IHasCategory>, textSource: Observable<IHasText>): any {
  return combineLatest([textSource, categorySource]).pipe(
    map((sources: any[]) => {
      return transformArrayToObject(sources);
    }));
}

function createLinkFromParameters(baseUrl: string, category: string, textQuery: string): string {
  return baseUrl + category + '/' + '?search=' + encodeURIComponent(textQuery);
}

function getPageNumber(link: string): number {
  let pageNumber = 1;
  const arr: string[] = link.split('page=');
  if (arr.length === 2) {
    pageNumber = parseInt(arr[1], 10);
  }
  return pageNumber;
}

function transformArrayToObject(array: any[]): object {
  let obj = {};
  array.forEach((value: any) => {
    if (value instanceof Object) {
      obj = {...obj, ...value};
    }
  });
  return obj;
}
