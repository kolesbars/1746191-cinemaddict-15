import CommentView from './comment-view.js';
import {getTimeFromMins} from '../utils/common.js';
import dayjs from 'dayjs';
import Smart from './smart.js';
import he from 'he';

const createPopupTemplate = (data) => {
  const {filmInfo, userDetails, commentsData, emotion, comment, isDisabled, deletingCommentId} = data;
  const releaseDate = dayjs(filmInfo.release.date).format('D MMMM YYYY');
  const getGenres = () => {
    const genres = [];
    for (let i = 0; i < filmInfo.genre.length; i++) {
      const genresElement = `<span class="film-details__genre">${filmInfo.genre[i]}</span>`;
      genres.push(genresElement);
    }
    return genres.join('');
  };

  const filmDuration = getTimeFromMins(filmInfo.duration);

  const genresTitle = filmInfo.genre.length === 1 ? 'Genre' : 'Genres';
  let commentElements = [];
  let commentsCount = 0;

  if (commentsData) {
    commentsCount = commentsData.length;
    const commentsArray = [];
    for (let i = 0; i < commentsCount; i++) {
      commentsArray.push(new CommentView(commentsData[i], deletingCommentId).getTemplate());
    }
    commentElements = commentsArray.join('');
  } else {
    commentElements = `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Sorry, comments are not uploaded</h2>
    </section>
  </section>`;
  }

  const inWatcheListClassName =  userDetails.isInWatchlist ?
    'film-details__control-button--watchlist film-details__control-button--active' : 'film-details__control-button--watchlist';

  const watchedClassName = userDetails.isWatched ?
    'film-details__control-button--watched film-details__control-button--active' :
    'film-details__control-button--watched';

  const favoritesClassName = userDetails.isFavorite ?
    'film-details__control-button--favorite film-details__control-button--active' :
    'film-details__control-button--favorite';

  const createNewCommentEmoji = (img) => `${img ? `<img src="./images/emoji/${img}.png" width="55" height="55"></img>` : ' '}`;

  const createCommentText = () => {
    if(comment) {
      return comment;
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
          <img class="film-details__poster-img" src="${filmInfo.poster}" alt="${filmInfo.name}">

          <p class="film-details__age">${filmInfo.age}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmInfo.name}</h3>
              <p class="film-details__title-original">Original: ${filmInfo.altName}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmInfo.screenwriters}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmInfo.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${filmDuration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmInfo.release.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genresTitle}</td>
              <td class="film-details__cell">
                ${getGenres()}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${filmInfo.description}
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
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
        <ul class="film-details__comments-list">
          ${commentElements}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${createNewCommentEmoji(emotion)}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isDisabled ? 'disabled' : ''}>${he.encode(createCommentText())}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isDisabled ? 'disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isDisabled ? 'disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isDisabled ? 'disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isDisabled ? 'disabled' : ''}>
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
    this._popup = popup;
    this._data = {
      emotion: '',
      comment: '',
      isDisabled: false,
      deletingCommentId: null,
    };
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
    this._commentInputKeydownHandler = this._commentInputKeydownHandler.bind(this);
    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);

    this._setInnerHandlers();
  }

  reset() {
    this.updateData({
      emotion: '',
      comment: '',
      isDisabled: false,
      deletingCommentId: null,
    });
  }

  resetAfterShake() {
    this.updateData({
      isDisabled: false,
      deletingCommentId: null,
    });
  }

  getTemplate() {
    return createPopupTemplate(this._parsePopupToData(this._popup));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseButtonClickHandler(this._callbacks.closePopup);
    this.setWatchListClickHandler(this._callbacks.watchListClick);
    this.setWatchedClickHandler(this._callbacks.watchedClick);
    this.setFavoritesClickHandler(this._callbacks.favoritesClick);
    this.setDeleteCommentClickHandler(this._callbacks.deleteComment);
    this.setAddNewCommentHandler(this._callbacks.addComment);
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
    this._callbacks.closePopup();
    this.reset();
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

  _smileEmojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: 'smile',
    });
  }

  _sleepingEmojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: 'sleeping',
    });
  }

  _pukeEmojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: 'puke',
    });
  }

  _angryEmojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: 'angry',
    });
  }

  _commentTextInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      comment: evt.target.value,
    }, true);
  }

  _getNewComment() {
    const parsedData = this._parsePopupToData(this._popup);
    return {
      emotion: parsedData.emotion,
      comment: parsedData.comment,
    };
  }

  _commentDeleteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      deletingCommentId: evt.target.closest('.film-details__comment').id,
    });
    this._callbacks.deleteComment(evt.target.closest('.film-details__comment'));
  }

  _commentInputKeydownHandler(evt) {
    if (evt.key === 'Enter' && evt.ctrlKey) {
      evt.preventDefault();
      this.updateData({
        isDisabled: true,
      });
      this._callbacks.addComment(this._getNewComment());
    }
  }

  _parsePopupToData(popup) {
    return Object.assign(
      {},
      popup,
      this._data,
    );
  }

  setAddNewCommentHandler(callback) {
    this._callbacks.addComment = callback;

    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('keydown', this._commentInputKeydownHandler);
  }

  setDeleteCommentClickHandler(callback) {
    this._callbacks.deleteComment = callback;
    const deleteButtons = this.getElement().querySelectorAll('.film-details__comment-delete');
    if (deleteButtons) {
      deleteButtons.forEach((button) => button.addEventListener('click', this._commentDeleteClickHandler));
    }
  }

  setCloseButtonClickHandler(callback) {
    this._callbacks.closePopup = callback;
    this.getElement().querySelector('.film-details__close').addEventListener('click', this._closeButtonClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callbacks.watchListClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callbacks.watchedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched')
      .addEventListener('click', this._watchedClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callbacks.favoritesClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this._favoritesClickHandler);
  }
}
