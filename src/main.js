import RatingView from './view/profile-rating.js';
import SiteMenuView from './view/menu.js';
import SortingView from './view/sorting.js';
import SiteContent from './view/content.js';
import FilmCardView from './view/film-card.js';
import FilmQuantityView from './view/films-quantity.js';
import ShowMoreView from './view/show-more-button.js';
import TopFilmsView from './view/top-rated-films.js';
import MostRatedView from './view/most-commented-filmes';
import PopupView from './view/popup-view.js';
import {generateFilmCards} from './moc/film.js';
import {generateFilters} from './moc/filters.js';
import {renderElement, RenderPosition, renderPopup} from './utils.js';

const FILM_COUNT = 25;
const FILM_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

const cardsData = generateFilmCards(FILM_COUNT);
const filters = generateFilters(cardsData);

const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');

renderElement(headerContainer, new RatingView().getElement(), RenderPosition.BEFOREEND);
renderElement(mainContainer, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(mainContainer, new SortingView().getElement(), RenderPosition.BEFOREEND);
renderElement(mainContainer, new SiteContent().getElement(), RenderPosition.BEFOREEND);

const contentContainer = mainContainer.querySelector('.films');
renderElement(contentContainer, new TopFilmsView().getElement(), RenderPosition.BEFOREEND);
renderElement(contentContainer, new MostRatedView().getElement(), RenderPosition.BEFOREEND);

const mainContentContainer = contentContainer.querySelector('.films-list');
const cardsContainers = contentContainer.querySelectorAll('.films-list__container');

for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
  const filmCard = new FilmCardView(cardsData[i]);
  const popupCard = new PopupView(cardsData[i]);

  renderElement(cardsContainers[0], filmCard.getElement(), RenderPosition.BEFOREEND);
  renderPopup (filmCard, popupCard);
}

if (FILM_COUNT_PER_STEP < cardsData.length) {
  renderElement(mainContentContainer, new ShowMoreView().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = contentContainer.querySelector('.films-list__show-more');
  let filmsCountMin = FILM_COUNT_PER_STEP;
  let filmsCountMax = filmsCountMin + FILM_COUNT_PER_STEP;

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    for (let i = filmsCountMin; i < filmsCountMax; i++) {
      const filmCard = new FilmCardView(cardsData[i]);
      const popupCard = new PopupView(cardsData[i]);

      renderElement(cardsContainers[0], filmCard.getElement(), RenderPosition.BEFOREEND);

      renderPopup(filmCard, popupCard);
    }

    filmsCountMin += FILM_COUNT_PER_STEP;
    filmsCountMax += FILM_COUNT_PER_STEP;

    if (filmsCountMax >= cardsData.length) {
      loadMoreButton.remove();
    }
  });
}

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  const topFilmCard = new FilmCardView(cardsData[i]);
  const popupCard = new PopupView(cardsData[i]);
  renderElement(cardsContainers[1], topFilmCard.getElement(), RenderPosition.BEFOREEND);
  renderPopup(topFilmCard, popupCard);
}

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  const mostCommentedFilmCard = new FilmCardView(cardsData[i]);
  const popupCard = new PopupView(cardsData[i]);
  renderElement(cardsContainers[2], mostCommentedFilmCard.getElement(), RenderPosition.BEFOREEND);
  renderPopup(mostCommentedFilmCard, popupCard);
}

const statisticsContainer = footerContainer.querySelector('.footer__statistics');
renderElement(statisticsContainer, new FilmQuantityView().getElement(), RenderPosition.BEFOREEND);

export {cardsData};
