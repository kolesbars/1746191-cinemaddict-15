import SiteFiltersView from '../view/filters.js';
import {filter} from '../utils/filters.js';
import {renderElement, replace, remove} from '../utils/render.js';
import {FilterType, UpdateType} from '../const.js';

export default class FilterPresenter {
  constructor(filterContainer, filterModel, moviesModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  init(callback) {
    const filters = this._getFilters();
    this._callback = callback;
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new SiteFiltersView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setMenuItemsClickHandler(this._callback);

    if (prevFilterComponent === null) {
      renderElement(this._filterContainer, this._filterComponent.getElement());
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);

    this._filterModel.addObserver(this._handleModelEvent);
    this._moviesModel.addObserver(this._handleModelEvent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.FILTER, filterType);
  }

  _getFilters() {
    const movies = this._moviesModel.getMovies();

    return [
      {
        type: FilterType.ALL,
        count: filter[FilterType.ALL](movies).length,
      },
      {
        type: FilterType.WATCHLIST,
        count: filter[FilterType.WATCHLIST](movies).length,
      },
      {
        type: FilterType.HISTORY,
        count: filter[FilterType.HISTORY](movies).length,
      },
      {
        type: FilterType.FAVORITES,
        count: filter[FilterType.FAVORITES](movies).length,
      },
    ];
  }
}
