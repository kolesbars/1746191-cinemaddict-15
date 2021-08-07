import {createRatingTemplate} from './view/profile-rating.js';
import {createMenuTemplate} from './view/menu.js';
import {createSortTemplate} from './view/sorting.js';
import {createCardContainerTemplate} from './view/content.js';
import {createCardTemplate} from './view/film-card.js';
import {createFilmsQuantityTemplate} from './view/films-quantity.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createExtraFilmsTemplate} from './view/extra-films.js';
import {createPopupTemplate} from './view/popup-view.js';
import {generateFilmCards} from './moc/film.js';
import {generateFilters} from './moc/filters.js';

const FILM_COUNT = 25;
const FILM_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

const renderElement = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const cardsData = generateFilmCards(FILM_COUNT);
const filters = generateFilters(cardsData);
const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');

renderElement(headerContainer, createRatingTemplate(), 'beforeend');
renderElement(mainContainer, createMenuTemplate(filters), 'beforeend');
renderElement(mainContainer, createSortTemplate(), 'beforeend');
renderElement(mainContainer, createCardContainerTemplate(), 'beforeend');

const contentContainer = mainContainer.querySelector('.films');
renderElement(contentContainer, createExtraFilmsTemplate(), 'beforeend');

const mainContentContainer = contentContainer.querySelector('.films-list');
const cardsContainers = document.querySelectorAll('.films-list__container');

for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
  renderElement(cardsContainers[0], createCardTemplate(cardsData[i]), 'beforeend');

  const cardTitles = mainContentContainer.querySelectorAll('.film-card__title');

  cardTitles[i].addEventListener('click', () => {
    renderElement(footerContainer, createPopupTemplate(cardsData[i]), 'afterend');
  });
}

if (FILM_COUNT_PER_STEP < cardsData.length) {
  renderElement(mainContentContainer, createShowMoreButtonTemplate(), 'beforeend');

  const loadMoreButton = contentContainer.querySelector('.films-list__show-more');
  let filmsCountMin = FILM_COUNT_PER_STEP;
  let filmsCountMax = filmsCountMin + FILM_COUNT_PER_STEP;
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    for (let i = filmsCountMin; i < filmsCountMax; i++) {
      renderElement(cardsContainers[0], createCardTemplate(cardsData[i]), 'beforeend');

      const cardTitles = mainContentContainer.querySelectorAll('.film-card__title');

      cardTitles[i].addEventListener('click', () => {
        renderElement(footerContainer, createPopupTemplate(cardsData[i]), 'afterend');
      });
    }
    filmsCountMin += FILM_COUNT_PER_STEP;
    filmsCountMax += FILM_COUNT_PER_STEP;

    if (filmsCountMax >= cardsData.length) {
      loadMoreButton.remove();
    }
  });
}

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  renderElement(cardsContainers[1], createCardTemplate(cardsData[i+5]), 'beforeend');
  renderElement(cardsContainers[2], createCardTemplate(cardsData[i+7]), 'beforeend');
}

const statisticsContainer = footerContainer.querySelector('.footer__statistics');
renderElement(statisticsContainer, createFilmsQuantityTemplate(), 'beforeend');

export {cardsData};
