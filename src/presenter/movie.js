import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup-view.js';
import {renderElement, remove, replace} from '../utils/render.js';
import {UpdateType, UserAction} from '../const.js';

export default class Movie {
  constructor(container, changeData, callback, api) {
    this._filmListContainer = container;
    this._changeData = changeData;
    this._bodyElement = document.querySelector('body');
    this._hidePopup = callback;
    this._api = api;

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._isShowPopup = false;

    this._handleWatcheList = this._handleWatcheList.bind(this);
    this._handleWatched = this._handleWatched.bind(this);
    this._handleFavorites = this._handleFavorites.bind(this);
    this._handlePopupWatcheList = this._handlePopupWatcheList.bind(this);
    this._handlePopupWatched = this._handlePopupWatched.bind(this);
    this._handlePopupFavorites = this._handlePopupFavorites.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleSetComments = this._handleSetComments.bind(this);
  }

  init(film, isShowUpdatePopup) {
    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._film = film;
    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new PopupView(film);
    this._isShowPopup = isShowUpdatePopup;

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

      if (this._isShowPopup) {
        const scrollTop = prevPopupComponent.getElement().scrollTop;
        this._bodyElement.appendChild(this._popupComponent.getElement());
        this._popupComponent.getElement().scrollTop = scrollTop;
        this._bodyElement.classList.add('hide-overflow');

      }
    }

    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _renderPopup(film, popup) {
    film.setShowPopupClickHandler(() => {
      this._api.getComments(this._film)
        .then((comments) => {
          this._handleSetComments(comments);
        })
        .catch(() => this._handleSetComments([]));

      this._hidePopup();
      this._bodyElement.appendChild(popup.getElement());
      this._bodyElement.classList.add('hide-overflow');
      document.addEventListener('keydown', this._escKeyDownHandler);
    });

    popup.setCloseButtonClickHandler(() => {
      remove(popup);
      this._bodyElement.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this._escKeyDownHandler);
    });
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      remove(this._popupComponent);
      this._bodyElement.classList.remove('hide-overflow');
    }
  }

  _handleSetComments(update) {
    this._changeData(
      UserAction.UPDATE_COMMENTS,
      UpdateType.CARD,
      Object.assign(
        {},
        this._film,
        {
          commentsData: update,
        },
      ),
    );
  }

  _handlePopupWatcheList() {
    this._changeData(
      UserAction.UPDATE_FILMS,
      UpdateType.POPUP,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            isInWatchlist: !this._film.userDetails.isInWatchlist,
            isWatched: this._film.userDetails.isWatched,
            isFavorite: this._film.userDetails.isFavorite,
          },
        },
      ),
    );
  }

  _handleWatcheList() {
    this._changeData(
      UserAction.UPDATE_FILMS,
      UpdateType.FILMS,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            isInWatchlist: !this._film.userDetails.isInWatchlist,
            isWatched: this._film.userDetails.isWatched,
            isFavorite: this._film.userDetails.isFavorite,
          },
        },
      ),
    );
  }

  _handlePopupWatched() {
    this._changeData(
      UserAction.UPDATE_FILMS,
      UpdateType.POPUP,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            isInWatchlist: this._film.userDetails.isInWatchlist,
            isWatched: !this._film.userDetails.isWatched,
            isFavorite: this._film.userDetails.isFavorite,
          },
        },
      ),
    );
  }

  _handleWatched() {
    this._changeData(
      UserAction.UPDATE_FILMS,
      UpdateType.FILMS,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            isInWatchlist: this._film.userDetails.isInWatchlist,
            isWatched: !this._film.userDetails.isWatched,
            isFavorite: this._film.userDetails.isFavorite,
          },
        },
      ),
    );
  }

  _handlePopupFavorites() {
    this._changeData(
      UserAction.UPDATE_FILMS,
      UpdateType.POPUP,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            isInWatchlist: this._film.userDetails.isInWatchlist,
            isWatched: this._film.userDetails.isWatched,
            isFavorite: !this._film.userDetails.isFavorite,
          },
        },
      ),
    );
  }

  _handleFavorites() {
    this._changeData(
      UserAction.UPDATE_FILMS,
      UpdateType.FILMS,
      Object.assign(
        {},
        this._film,
        {
          userDetails: {
            isInWatchlist: this._film.userDetails.isInWatchlist,
            isWatched: this._film.userDetails.isWatched,
            isFavorite: !this._film.userDetails.isFavorite,
          },
        },
      ),
    );
  }

  _handleDeleteComment(com) {
    this._api.deleteComment(com)
      .then(() => {
        this._changeData(
          UserAction.UPDATE_COMMENTS,
          UpdateType.CARD,
          Object.assign(
            {},
            this._film,
            {
              commentsData: this._film.commentsData.filter((comment) => comment.id !== com.id),
            },
          ),
        );
      })
      .catch(() => {
        this._popupComponent.shake(() => this._popupComponent.resetAfterShake());
      });
  }

  _handleAddComment(comment) {
    this._api.addComment(this._film, comment)
      .then((response) => {
        this._changeData(
          UserAction.UPDATE_COMMENTS,
          UpdateType.CARD,
          Object.assign(
            {},
            this._film,
            {
              commentsData: response.comments,
            },
          ),
        );
      })
      .catch(() => {
        this._popupComponent.shake(() => this._popupComponent.resetAfterShake());
      });
  }
}
