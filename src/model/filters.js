import AbstractObserver from '../utils/abstract-observer.js';
import {FilterType} from '../const.js';

export default class Filters extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(UpdateType, filter) {
    this._activeFilter = filter;
    this._notify(UpdateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
