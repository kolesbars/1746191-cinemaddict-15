import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup-view.js';
import {renderElement, RenderPosition, remove, replace} from '../utils/render.js';

export default class Movie {
  constructor(container, changeData, callback) {
    this._filmListContainer = container;
    this._changeData = changeData;
    this._bodyElement = document.querySelector('body');
    this._hidePopup = callback;

    this._filmCardComponent = null;
    this._popupComponent = null;

    this._handleWatcheListClick = this._handleWatcheListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
  }

  init(film) {
    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._film = film;
    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new PopupView(film);

    const cardsContainer = this._filmListContainer.getElement().querySelector('.films-list__container');

    this._filmCardComponent.setWatchListClickHandler(this._handleWatcheListClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoritesClickHandler(this._handleFavoritesClick);
    this._popupComponent.setWatchListClickHandler(this._handleWatcheListClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupComponent.setFavoritesClickHandler(this._handleFavoritesClick);

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      renderElement(cardsContainer, this._filmCardComponent.getElement(), RenderPosition.BEFOREEND);
      this._renderPopup (this._filmCardComponent, this._popupComponent);
      return;
    }

    if (cardsContainer.contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
      this._renderPopup (this._filmCardComponent, this._popupComponent);
      this._bodyElement.classList.remove('hide-overflow');
    }

    if (this._bodyElement.contains(prevPopupComponent.getElement())) {
      const scrollHeigt = prevPopupComponent.getElement().scrollTop;
      this._bodyElement.appendChild(this._popupComponent.getElement());
      this._popupComponent.getElement().scrollTop = scrollHeigt;
      this._bodyElement.classList.add('hide-overflow');
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

  _handleWatcheListClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _handleFavoritesClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }
}
