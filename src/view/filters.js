import Abstract from './abstract.js';

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

  return `<a href="#${type}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}" value="${type}">${filterTytle(type)} ${type !== 'all' ? `<span class="main-navigation__item-count">${count}</span>` : ''}</a>`;
};

const createFiltersTemplate = (filterItems, currentFilterType) => {

  const filterItemTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
  ${filterItemTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};


export default class SiteFiltersView extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callbacks.filterTypeChange(evt.target.getAttribute('value'));
  }

  setFilterTypeChangeHandler(callback) {
    this._callbacks.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__item').forEach((element) => element.addEventListener('click', this._filterTypeChangeHandler));
  }
}
