import RatingView from '../view/profile-rating.js';
import SortingView from '../view/sorting.js';
import SiteContent from '../view/content.js';
import FilmQuantityView from '../view/films-quantity.js';
import ShowMoreView from '../view/show-more-button.js';
import TopFilmsView from '../view/top-rated-films.js';
import MostCommentedView from '../view/most-commented-filmes';
import NoFilms from '../view/no-films.js';
import StatsButtonView from '../view/stats-button.js';
import {renderElement, remove} from '../utils/render.js';
import {sortByDate, sortByRating, sortByComments} from '../utils/common.js';
import {filter} from '../utils/filters.js';
import Movie from './movie.js';
import {UpdateType, FilterType} from '../const.js';
import {SortType} from '../const.js';

const FILM_COUNT_PER_STEP = 5;

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
    this._currentSortType = SortType.DEFAULT;

    this._showMoreComponent = null;
    this._noFilmComponent = null;
    this._sortingComponent = null;

    this._ratingComponent = new RatingView(moviesModel.getMovies());
    this._contentComponent = new SiteContent();
    this._filmQuantityComponent = new FilmQuantityView();
    this._topFilmsComponent = new TopFilmsView();
    this._mostCommentedFilmsComponent = new MostCommentedView();
    this._statsButtonComponent = new StatsButtonView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  init() {
    this._renderPage();

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearPage({resetRenderedFilmCount: true, resetSortType: true});

    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getFilms() {
    this._filterType = this._filterModel.getFilter();
    const films = this._moviesModel.getMovies();
    const filtredFilms = filter[this._filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.sort(sortByDate);
      case SortType.RATING:
        return filtredFilms.sort(sortByRating);
    }

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
        this._clearPage({resetRenderedFilmCount: true, resetSortType: true});
        this._renderPage();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPage({resetRenderedFilmCount: true});
    this._renderPage();
  }

  _renderSort() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    renderElement(this._mainContainer, this._sortingComponent.getElement());
  }

  _renderRating() {
    renderElement( this._headerContainer, this._ratingComponent.getElement());
  }

  _renderContent() {
    renderElement(this._mainContainer, this._contentComponent.getElement());
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

  _renderTopFilms() {
    this._getFilms().sort(sortByRating).slice(0, 2).forEach((film) => this._renderFilm(film, this._topFilmsComponent));
  }

  _renderMostCommentedFilms() {
    this._getFilms().sort(sortByComments).slice(0, 2).forEach((film) => this._renderFilm(film, this._mostCommentedFilmsComponent));
  }

  _renderTopFilmsList() {
    renderElement(this._contentComponent.getElement(), this._topFilmsComponent.getElement());
    this._renderTopFilms();
  }

  _renderMostCommentedFilmsList() {
    renderElement(this._contentComponent.getElement(), this._mostCommentedFilmsComponent.getElement());
    this._renderMostCommentedFilms();
  }

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

  _clearPage({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._filmPresenters.forEach((presenter) => presenter.destroy());
    this._filmPresenters.clear;

    remove(this._showMoreComponent);
    remove(this._sortingComponent);
    remove(this._topFilmsComponent);
    remove(this._mostCommentedFilmsComponent);

    if(this._noFilmComponent) {
      remove(this._noFilmComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
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

    if(filmsCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderTopFilmsList();
    this._renderMostCommentedFilmsList();

    this._renderFilms(films.slice(0, Math.min(filmsCount, this._renderedFilmCount)));

    if (this._renderedFilmCount < filmsCount) {
      this._renderShowMoreButton();
    }
  }
}

