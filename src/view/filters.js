import Abstract from './abstract.js';
import StatsButtonView from './stats-button.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, count} = filter;

  const filterTytle = (filterType) => {
    switch (filterType) {
      case 'all':
        return 'All movies';
      case 'watchlist':
        return 'Watchlist';
      case 'watched':
        return 'History';
      case 'favorites':
        return 'Favorites';
    }
  };

  return `<a href="#${type}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}" data-menu-item="${type}">${filterTytle(type)} ${type !== 'all' ? `<span class="main-navigation__item-count">${count}</span>` : ''}</a>`;
};

const statsButton = new StatsButtonView().getTemplate();

const createFiltersTemplate = (filterItems, currentFilterType) => {

  const filterItemTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
  ${filterItemTemplate}
    </div>
    ${statsButton}
  </nav>`;
};


export default class SiteFiltersView extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._menuItemsClickHandler = this._menuItemsClickHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callbacks.filterTypeChange(evt.target.dataset.menuItem);
  }

  _menuItemsClickHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callbacks.menuItemClick(evt.target.dataset.menuItem);
  }

  setFilterTypeChangeHandler(callback) {
    this._callbacks.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__items').forEach((element) => element.addEventListener('click', this._filterTypeChangeHandler));
  }

  setMenuItemsClickHandler(callback) {
    this._callbacks.menuItemClick = callback;
    this.getElement()
      .addEventListener('click', this._menuItemsClickHandler);
  }
}
