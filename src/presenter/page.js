import RatingView from '../view/profile-rating.js';
import SortingView from '../view/sorting.js';
import SiteContent from '../view/content.js';
import FilmQuantityView from '../view/films-quantity.js';
import ShowMoreView from '../view/show-more-button.js';
import TopFilmsView from '../view/top-rated-films.js';
import MostCommentedView from '../view/most-commented-filmes';
import {renderElement, remove} from '../utils/render.js';
import Movie from './movie.js';
import {UpdateType, FilterType} from '../const.js';
import {filter} from '../utils/filters.js';
import NoFilms from '../view/no-films.js';

const FILM_COUNT_PER_STEP = 5;
//const EXTRA_FILMS_COUNT = 2;

export default class PagePresenter {
  constructor(headerContainer, mainContainer, footerContainer, moviesModel, filterModel) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._footerContainer = footerContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenters = new Map;
    this._filterType = FilterType.ALL;

    this._showMoreComponent = null;
    this._noFilmComponent = null;

    this._ratingComponent = new RatingView();
    this._sortingComponent = new SortingView();
    this._contentComponent = new SiteContent();
    this._filmQuantityComponent = new FilmQuantityView();
    this._topFilmsComponent = new TopFilmsView();
    this._mostCommentedFilmsComponent = new MostCommentedView();
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderPage();
  }

  _getFilms() {
    this._filterType = this._filterModel.getFilter();
    const films = this._moviesModel.getMovies();
    const filtredFilms = filter[this._filterType](films);
    return filtredFilms;
  }

  _handleViewAction(updateType, update) {
    this._moviesModel.updateMovie(updateType, update);
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.CARD:
        this._filmPresenters.get(data.id).init(data, true);
        break;
      case UpdateType.FILMS:
        this._clearPage();
        this._renderPage();
        break;
      case UpdateType.POPUP:
        this._clearPage();
        this._renderPage();
        this._filmPresenters.get(data.id).init(data, true);
        break;
      case UpdateType.FILTER:
        this._clearPage({resetRenderedFilmCount: true});
        this._renderPage();
        break;
    }
  }

  _renderRating() {
    renderElement( this._headerContainer, this._ratingComponent.getElement());
  }

  _renderMenu() {
    renderElement(this._mainContainer, this._menuComponent.getElement());
  }

  _renderContent() {
    renderElement(this._mainContainer, this._contentComponent.getElement());
  }

  _renderSort() {
    renderElement(this._mainContainer, this._sortingComponent.getElement());
  }

  _renderFilmsQuntity() {
    renderElement(this._footerContainer, this._filmQuantityComponent.getElement());
  }

  _renderNoFilms() {
    this._noFilmComponent = new NoFilms(this._filterType);
    renderElement(this._contentComponent.getElement(), this._noFilmComponent.getElement());
  }

  _renderFilm(film, container) {
    const filmPresenter = new Movie(container, this._handleViewAction, this._hidePopup);
    filmPresenter.init(film);
    this._filmPresenters.set(film.id, filmPresenter);
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film, this._contentComponent));
  }

  /*_renderTopFilms(films) {
    films.forEach((film) => this._renderFilm(film, this._topFilmsComponent));
  }

  _renderMostCommentedFilms(films) {
    films.forEach((film) => this._renderFilm(film, this._mostCommentedFilmsComponent));
  }

  _renderTopFilmsList() {
    renderElement(this._contentComponent.getElement(), this._topFilmsComponent.getElement());
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, EXTRA_FILMS_COUNT));
    this._renderTopFilms(films);
  }

  _renderMostCommentedFilmsList() {
    renderElement(this._contentComponent.getElement(), this._mostCommentedFilmsComponent.getElement());
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, EXTRA_FILMS_COUNT));
    this._renderMostCommentedFilms(films);
  }*/

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreComponent !== null) {
      this._showMoreComponent = null;
    }
    this._showMoreComponent = new ShowMoreView();
    const mainContentContainer = this._contentComponent.getElement().querySelector('.films-list');

    renderElement(mainContentContainer, this._showMoreComponent.getElement());

    this._showMoreComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearPage({resetRenderedFilmCount = false} = {}) {
    const filmCount = this._getFilms().length;

    this._filmPresenters.forEach((presenter) => presenter.destroy());
    this._filmPresenters.clear;

    remove(this._showMoreComponent);

    if(this._noFilmComponent) {
      remove(this._noFilmComponent);
    }

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }
  }

  _hidePopup() {
    const popupElement = this._bodyElement.querySelector('.film-details');

    if (popupElement) {
      popupElement.remove();
    }
  }

  _renderPage() {
    const films = this._getFilms();
    const filmsCount = films.length;

    this._renderRating();
    this._renderSort();
    this._renderContent();
    this._renderFilmsQuntity();
    //this._renderTopFilmsList();
    //this._renderMostCommentedFilmsList();
    if(filmsCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilms(films.slice(0, Math.min(filmsCount, this._renderedFilmCount)));

    if (this._renderedFilmCount < filmsCount) {
      this._renderShowMoreButton();
    }
  }
}

