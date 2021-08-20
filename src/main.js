/*import RatingView from './view/profile-rating.js';
import SiteMenuView from './view/menu.js';
import SortingView from './view/sorting.js';
import SiteContent from './view/content.js';
import FilmCardView from './view/film-card.js';
import FilmQuantityView from './view/films-quantity.js';
import ShowMoreView from './view/show-more-button.js';
import TopFilmsView from './view/top-rated-films.js';
import MostCommentedView from './view/most-commented-filmes';
import PopupView from './view/popup-view.js';*/
import {generateFilmCards} from './moc/film.js';
import {generateFilters} from './moc/filters.js';
import MovieList from './presenter/page.js';
//import {renderElement, RenderPosition, renderPopup} from './utils/render.js';

const FILM_COUNT = 25;
//const FILM_COUNT_PER_STEP = 5;
//const EXTRA_FILMS_COUNT = 2;

const cardsData = generateFilmCards(FILM_COUNT);
const filters = generateFilters(cardsData);

const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const statisticsContainer = footerContainer.querySelector('.footer__statistics');

const moviePresenter = new MovieList(headerContainer, mainContainer, statisticsContainer);
moviePresenter.init(cardsData, filters);
/*const contentContainer = new SiteContent();

renderElement(headerContainer, new RatingView().getElement(), RenderPosition.BEFOREEND);
renderElement(mainContainer, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(mainContainer, new SortingView().getElement(), RenderPosition.BEFOREEND);
renderElement(mainContainer, contentContainer.getElement(), RenderPosition.BEFOREEND);

const renderExtraFilms = () => {
  const topRatedFilmElement =  new TopFilmsView();
  const mostCommentedFilmsElement = new MostCommentedView();
  renderElement(contentContainer.getElement(), topRatedFilmElement.getElement(), RenderPosition.BEFOREEND);
  renderElement(contentContainer.getElement(), mostCommentedFilmsElement.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    const topFilmsContainer = topRatedFilmElement.getElement().querySelector('.films-list__container');
    const topFilmCard = new FilmCardView(cardsData[i]);
    const popupCard = new PopupView(cardsData[i]);
    renderElement(topFilmsContainer, topFilmCard.getElement(), RenderPosition.BEFOREEND);
    renderPopup(topFilmCard, popupCard);
  }

  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    const mostCommentsContainer = mostCommentedFilmsElement.getElement().querySelector('.films-list__container');
    const mostCommentedFilmCard = new FilmCardView(cardsData[i]);
    const popupCard = new PopupView(cardsData[i]);
    renderElement(mostCommentsContainer, mostCommentedFilmCard.getElement(), RenderPosition.BEFOREEND);
    renderPopup(mostCommentedFilmCard, popupCard);
  }
};


const renderFilms = () => {
  const mainContentContainer = contentContainer.getElement().querySelector('.films-list');
  const cardsContainers = contentContainer.getElement().querySelector('.films-list__container');

  cardsData.slice(0, Math.min(cardsData.length, FILM_COUNT_PER_STEP)).forEach((film) => {
    const filmCard = new FilmCardView(film);
    const popupCard = new PopupView(film);

    renderElement(cardsContainers, filmCard.getElement(), RenderPosition.BEFOREEND);
    renderPopup (filmCard, popupCard);
  });

  if (FILM_COUNT_PER_STEP < cardsData.length) {
    const loadMoreButton = new ShowMoreView();
    let filmsCount = FILM_COUNT_PER_STEP;

    renderElement(mainContentContainer, loadMoreButton.getElement(), RenderPosition.BEFOREEND);

    loadMoreButton.setClickHandler(() => {
      cardsData.slice(filmsCount, filmsCount + FILM_COUNT_PER_STEP).forEach((film) => {
        const filmCard = new FilmCardView(film);
        const popupCard = new PopupView(film);

        renderElement(cardsContainers, filmCard.getElement(), RenderPosition.BEFOREEND);

        renderPopup(filmCard, popupCard);
      });

      filmsCount += FILM_COUNT_PER_STEP;

      if (filmsCount >= cardsData.length) {
        loadMoreButton.getElement().remove();
        loadMoreButton.removeElement();
      }
    });
  }
};

renderFilms();
renderExtraFilms();


renderElement(statisticsContainer, new FilmQuantityView().getElement(), RenderPosition.BEFOREEND);*/

export {cardsData, filters};
