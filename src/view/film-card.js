import dayjs from 'dayjs';
import {createElement} from '../utils.js';

const createCardTemplate = (data) => {
  const {poster, name, description, rating, comments, date, genre, duration, isInWatchlist, isWatched, isFavorite} = data;

  const releaseDate = dayjs(date).format('YYYY');

  const inWatcheListClassName =  isInWatchlist ?
    'film-card__controls-item--add-to-watchlist film-card__controls-item--active' : 'film-card__controls-item--add-to-watchlist';

  const watchedClassName = isWatched ?
    'film-card__controls-item--mark-as-watched film-card__controls-item--active' :
    'film-card__controls-item--mark-as-watched';

  const favoritesClassName = isFavorite ?
    'film-card__controls-item--favorite film-card__controls-item--active' :
    'film-card__controls-item--favorite';

  return `<article class="film-card">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseDate}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre[0]}</span>
          </p>
          <img src="./images/posters/${poster}" alt="${name}" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item ${inWatcheListClassName}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item ${watchedClassName}" type="button">Mark as watched</button>
            <button class="film-card__controls-item ${favoritesClassName}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCardView {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
