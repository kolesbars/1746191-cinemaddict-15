import CommentView from './comment.js';
import dayjs from 'dayjs';
import Smart from './smart.js';

const createPopupTemplate = (data) => {
  const {poster, name, description, date, rating, comments, genre, duration, director, screenwriters, actors, country, age, isInWatchlist, isWatched, isFavorite, emoji, altText, commentText} = data;

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

  const createNewCommentEmoji = (img, text) => `${img ? `<img src="${img}" width="55" height="55" alt="${text ? text : ' '}"></img>` : ' '}`;

  const createCommentText = () => {
    if(commentText) {
      return commentText;
    }
    return '';
  };

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
          <div class="film-details__add-emoji-label">
            ${createNewCommentEmoji(emoji, altText)}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${createCommentText()}</textarea>
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

export default class PopupView extends Smart {
  constructor(popup) {
    super();
    this._data = PopupView.parsePopupToData(popup);
    this._emojyContainer = this.getElement().querySelector('.film-details__add-emoji-label');

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._smileEmojiClickHandler =  this._smileEmojiClickHandler.bind(this);
    this._sleepingEmojiClickHandler =  this._sleepingEmojiClickHandler.bind(this);
    this._pukeEmojiClickHandler =  this._pukeEmojiClickHandler.bind(this);
    this._angryEmojiClickHandler =  this._angryEmojiClickHandler.bind(this);
    this._commentTextInputHandler = this._commentTextInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(popup) {
    this.updateData(
      PopupView.parsePopupToData(popup),
    );
  }

  getTemplate() {
    return createPopupTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.click);
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoritesClickHandler(this._callback.favoritesClick);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('#emoji-smile')
      .addEventListener('click', this._smileEmojiClickHandler);
    this.getElement().querySelector('#emoji-sleeping')
      .addEventListener('click', this._sleepingEmojiClickHandler);
    this.getElement().querySelector('#emoji-puke')
      .addEventListener('click', this._pukeEmojiClickHandler);
    this.getElement().querySelector('#emoji-angry')
      .addEventListener('click', this._angryEmojiClickHandler);
    this.getElement().querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentTextInputHandler);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
    this.reset(this._popup);
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

  _smileEmojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emoji: 'images/emoji/smile.png',
      altText: 'emoji-smile',
    });
  }

  _sleepingEmojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emoji: 'images/emoji/sleeping.png',
      altText: 'emoji-sleeping',
    });
  }

  _pukeEmojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emoji: 'images/emoji/puke.png',
      altText: 'emoji-puke',
    });
  }

  _angryEmojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emoji: 'images/emoji/angry.png',
      altText: 'emoji-angry',
    });
  }

  _commentTextInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      commentText: evt.target.value,
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PopupView.parseDataToTask(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
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

  static parsePopupToData(popup) {
    return Object.assign(
      {},
      popup,
      {
        emoji: '',
        altText: '',
        commentText: '',
      },
    );
  }

  static parseDataToPopup(data) {
    data = Object.assign(
      {},
      data,
    );

    delete data.emoji;
    delete data.altText;
    delete data.commentText;

    return data;
  }

}
