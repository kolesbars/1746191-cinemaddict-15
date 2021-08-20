import CommentView from './comment.js';
import dayjs from 'dayjs';
import Abstract from './abstract.js';


const createPopupTemplate = (data) => {
  const {poster, name, description, date, rating, comments, genre, duration, director, screenwriters, actors, country, age, isInWatchlist, isWatched, isFavorite} = data;

  const releaseDate = dayjs(date).format('D MMMM YYYY');

  const getGenres = () => {
    const genres = [];
    for (let i = 0; i < genre.length; i++) {
      const genresElement = `<span class="film-details__genre">${genre[i]}</span>`;
      genres.push(genresElement);
    }
    return genres.join();
  };

  const genresTitle = genre.length === 1 ? 'Genre' : 'Genres';

  const commentsCount = comments.length;
  const commentsArray = [];
  for (let i = 0; i < commentsCount; i++) {
    commentsArray.push(new CommentView(comments[i]).getTemplate());
  }
  const commentElements = commentsArray.join();

  const inWatcheListClassName =  isInWatchlist ?
    'film-details__control-button--watchlist film-details__control-button--active' : 'film-details__control-button--watchlist';

  const watchedClassName = isWatched ?
    'film-details__control-button--watched film-details__control-button--active' :
    'film-details__control-button--watched';

  const favoritesClassName = isFavorite ?
    'film-details__control-button--favorite film-details__control-button--active' :
    'film-details__control-button--favorite';

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${name}">

          <p class="film-details__age">${age}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${name}</h3>
              <p class="film-details__title-original">Original: ${name}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${screenwriters}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genresTitle}</td>
              <td class="film-details__cell">
                ${getGenres()}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${inWatcheListClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${watchedClassName}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${favoritesClassName}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list">
          ${commentElements}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;};

export default class PopupView extends Abstract {
  constructor(popup) {
    super();
    this._popup = popup;
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._popup);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritesClick();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close').addEventListener('click', this._closeButtonClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched')
      .addEventListener('click', this._watchedClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this._favoritesClickHandler);
  }
}
