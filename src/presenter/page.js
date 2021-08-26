import RatingView from '../view/profile-rating.js';
import SiteFiltersView from '../view/filters.js';
import SortingView from '../view/sorting.js';
import SiteContent from '../view/content.js';
import FilmQuantityView from '../view/films-quantity.js';
import ShowMoreView from '../view/show-more-button.js';
import TopFilmsView from '../view/top-rated-films.js';
import MostCommentedView from '../view/most-commented-filmes';
import {renderElement, RenderPosition, remove} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import Movie from './movie.js';

const FILM_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

export default class PagePresenter {
  constructor(headerContainer, mainContainer, footerContainer) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._footerContainer = footerContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = new Map;

    this._ratingComponent = new RatingView();
    this._sortingComponent = new SortingView();
    this._contentComponent = new SiteContent();
    this._filmQuantityComponent = new FilmQuantityView();
    this._showMoreComponent = new ShowMoreView();
    this._topFilmsComponent = new TopFilmsView();
    this._mostCommentedFilmsComponent = new MostCommentedView();
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(filmsData, filters) {
    this._filmsData = filmsData.slice();
    this._filtersComponent = new SiteFiltersView(filters);

    this._renderSite();
  }

  _handleFilmChange(updateFilm) {
    this._filmsData = updateItem(this._filmsData, updateFilm);
    this._filmPresenter.get(updateFilm.id).init(updateFilm);
  }

  _renderRating() {
    renderElement( this._headerContainer, this._ratingComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilters() {
    renderElement(this._mainContainer, this._filtersComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderContent() {
    renderElement(this._mainContainer, this._contentComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderSort() {
    renderElement(this._mainContainer, this._sortingComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilmsQuntity() {
    renderElement(this._footerContainer, this._filmQuantityComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilm(film, container) {
    const filmPresenter = new Movie(container, this._handleFilmChange, this._hidePopup);
    filmPresenter.init(film);
    this._filmPresenter.set(film.id, filmPresenter);
  }

  _renderFilms(from, to) {
    this._filmsData.slice(from, to).forEach((filmData) => this._renderFilm(filmData, this._contentComponent));
  }

  _renderTopFilms(from, to) {
    this._filmsData.slice(from, to).forEach((filmData) => this._renderFilm(filmData, this._topFilmsComponent));
  }

  _renderMostCommentedFilms(from, to) {
    this._filmsData.slice(from, to).forEach((filmData) => this._renderFilm(filmData, this._mostCommentedFilmsComponent));
  }

  _renderTopFilmsList() {
    renderElement(this._contentComponent.getElement(), this._topFilmsComponent.getElement(), RenderPosition.BEFOREEND);

    this._renderTopFilms(0, Math.min(this._filmsData.length, EXTRA_FILMS_COUNT));
  }

  _renderMostCommentedFilmsList() {
    renderElement(this._contentComponent.getElement(), this._mostCommentedFilmsComponent.getElement(), RenderPosition.BEFOREEND);

    this._renderMostCommentedFilms(0, Math.min(this._filmsData.length, EXTRA_FILMS_COUNT));
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._filmsData.length) {
      remove(this._showMoreComponent);
    }
  }

  _renderShowMoreButton() {
    const mainContentContainer = this._contentComponent.getElement().querySelector('.films-list');

    renderElement(mainContentContainer, this._showMoreComponent.getElement(), RenderPosition.BEFOREEND);

    this._showMoreComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearFilmList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreComponent);
  }

  _hidePopup() {
    const popupElement = this._bodyElement.querySelector('.film-details');

    if (popupElement) {
      popupElement.remove();
    }
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._filmsData.length, FILM_COUNT_PER_STEP));

    if (FILM_COUNT_PER_STEP < this._filmsData.length) {
      this._renderShowMoreButton();
    }
  }

  _renderSite() {
    this._renderRating();
    this._renderFilters();
    this._renderSort();
    this._renderContent();
    this._renderFilmsQuntity();
    this._renderTopFilmsList();
    this._renderMostCommentedFilmsList();
    this._renderFilmsList();
  }
}

