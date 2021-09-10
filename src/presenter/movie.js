import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup-view.js';
import {renderElement, remove, replace} from '../utils/render.js';
import {UpdateType} from '../const.js';

export default class Movie {
  constructor(container, changeData, callback) {
    this._filmListContainer = container;
    this._changeData = changeData;
    this._bodyElement = document.querySelector('body');
    this._hidePopup = callback;

    this._filmCardComponent = null;
    this._popupComponent = null;

    this._handleWatcheList = this._handleWatcheList.bind(this);
    this._handleWatched = this._handleWatched.bind(this);
    this._handleFavorites = this._handleFavorites.bind(this);
    this._handlePopupWatcheList = this._handlePopupWatcheList.bind(this);
    this._handlePopupWatched = this._handlePopupWatched.bind(this);
    this._handlePopupFavorites = this._handlePopupFavorites.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);
  }

  init(film, isShowUpdatePopup) {
    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._film = film;
    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new PopupView(film);

    const cardsContainer = this._filmListContainer.getElement().querySelector('.films-list__container');

    this._filmCardComponent.setWatchListClickHandler(this._handleWatcheList);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatched);
    this._filmCardComponent.setFavoritesClickHandler(this._handleFavorites);

    this._popupComponent.setWatchListClickHandler(this._handlePopupWatcheList);
    this._popupComponent.setWatchedClickHandler(this._handlePopupWatched);
    this._popupComponent.setFavoritesClickHandler(this._handlePopupFavorites);
    this._popupComponent.setDeleteCommentClickHandler(this._handleDeleteComment);
    this._popupComponent.setAddNewCommentHandler(this._handleAddComment);

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      renderElement(cardsContainer, this._filmCardComponent.getElement());
      this._renderPopup(this._filmCardComponent, this._popupComponent);
      return;
    }

    if (cardsContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
      this._renderPopup(this._filmCardComponent, this._popupComponent);
      this._bodyElement.classList.remove('hide-overflow');

      if (isShowUpdatePopup) {
        const scrollTop = prevPopupComponent.getElement().scrollTop;
        this._bodyElement.appendChild(this._popupComponent.getElement());
        this._popupComponent.getElement().scrollTop = scrollTop;
        this._bodyElement.classList.add('hide-overflow');
      }
    }

    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
  }

  _renderPopup(film, popup) {
    film.setShowPopupClickHandler(() => {
      this._hidePopup();
      popup.reset(this._film);
      this._bodyElement.appendChild(popup.getElement());
      this._bodyElement.classList.add('hide-overflow');
    });

    popup.setCloseButtonClickHandler(() => {
      this._bodyElement.removeChild(popup.getElement());
      this._bodyElement.classList.remove('hide-overflow');
      popup.reset(this._film);
    });
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
  }

  _handlePopupWatcheList() {
    this._changeData(
      UpdateType.POPUP,
      Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist,
        },
      ),
    );
  }

  _handleWatcheList() {
    this._changeData(
      UpdateType.FILMS,
      Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist,
        },
      ),
    );
  }

  _handlePopupWatched() {
    this._changeData(
      UpdateType.POPUP,
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _handleWatched() {
    this._changeData(
      UpdateType.FILMS,
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _handlePopupFavorites() {
    this._changeData(
      UpdateType.POPUP,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleFavorites() {
    this._changeData(
      UpdateType.FILMS,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleDeleteComment(id) {
    this._changeData(
      UpdateType.CARD,
      Object.assign(
        {},
        this._film,
        {
          comments: this._film.comments.filter((comment) => comment.id !== id),
        },
      ),
    );
  }

  _handleAddComment(comment) {
    this._changeData(
      UpdateType.CARD,
      Object.assign(
        {},
        this._film,
        {
          comments: [
            ...this._film.comments,
            comment,
          ],
        },
      ),
    );
  }
}
