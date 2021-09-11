import Abstract from './abstract.js';
import {FilterType} from '../const.js';

const NoFilmsTextType = {
  [FilterType.ALL] : 'There are no movies in our database',
  [FilterType.WATCHLIST] : 'There are no movies to watch now',
  [FilterType.HISTORY] : 'There are no watched movies now',
  [FilterType.FAVORITES] : 'There are no favorite movies now',
};

const createNoFilmsTemplate = (filterType) => {
  const noFilmsTextValue = NoFilmsTextType[filterType];

  return `<h2 class="films-list__title">${noFilmsTextValue}</h2>`;
};

export default class NoFilms extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoFilmsTemplate(this._data);
  }
}
