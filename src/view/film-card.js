import dayjs from 'dayjs';
import Abstract from './abstract.js';
import {getTimeFromMins} from '../utils/common.js';

const createCardTemplate = (data) => {
  const {filmInfo, comments, userDetails} = data;

  const filmDuration = getTimeFromMins(filmInfo.duration);
  const releaseDate = dayjs(filmInfo.release.date).format('YYYY');

  const inWatcheListClassName =  userDetails.isInWatchlist ?
    'film-card__controls-item--add-to-watchlist film-card__controls-item--active' : 'film-card__controls-item--add-to-watchlist';

  const watchedClassName = userDetails.isWatched ?
    'film-card__controls-item--mark-as-watched film-card__controls-item--active' :
    'film-card__controls-item--mark-as-watched';

  const favoritesClassName = userDetails.isFavorite ?
    'film-card__controls-item--favorite film-card__controls-item--active' :
    'film-card__controls-item--favorite';

  return `<article class="film-card">
          <h3 class="film-card__title">${filmInfo.name}</h3>
          <p class="film-card__rating">${filmInfo.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseDate}</span>
            <span class="film-card__duration">${filmDuration}</span>
            <span class="film-card__genre">${filmInfo.genre[0]}</span>
          </p>
          <img src="${filmInfo.poster}" alt="${filmInfo.name}" class="film-card__poster">
          <p class="film-card__description">${filmInfo.description.length <= 140 ? filmInfo.description : `${filmInfo.description.substring(0, 139)}...`}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item ${inWatcheListClassName}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item ${watchedClassName}" type="button">Mark as watched</button>
            <button class="film-card__controls-item ${favoritesClassName}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCardView extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._showPopupClickHandler = this._showPopupClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  _showPopupClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.click();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.watchListClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.watchedClick();
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.favoritesClick();
  }

  setShowPopupClickHandler(callback) {
    this._callbacks.click = callback;
    this.getElement().querySelectorAll('.film-card__title, .film-card__poster, .film-card__comments')
      .forEach((element) => element.addEventListener('click', this._showPopupClickHandler));
  }

  setWatchListClickHandler(callback) {
    this._callbacks.watchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callbacks.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._watchedClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callbacks.favoritesClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._favoritesClickHandler);
  }
}
