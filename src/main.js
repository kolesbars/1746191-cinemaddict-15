import {createRatingTemplate} from './view/profile-rating.js';
import {createMenuTemplate} from './view/menu.js';
import {createSortTemplate} from './view/sorting.js';
import {createCardContainerTemplate} from './view/content.js';
import {createCardTemplate} from './view/film-card.js';
import {createFilmsQuantityTemplate} from './view/films-quantity.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createExtraFilmsTemplate} from './view/extra-films.js';

const FILM_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const renderElement = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');

renderElement(headerContainer, createRatingTemplate(), 'beforeend');
renderElement(mainContainer, createMenuTemplate(), 'beforeend');
renderElement(mainContainer, createSortTemplate(), 'beforeend');
renderElement(mainContainer, createCardContainerTemplate(), 'beforeend');

const contentContainer = document.querySelector('.films');
renderElement(contentContainer, createExtraFilmsTemplate(), 'beforeend');

const mainContentContainer = document.querySelector('.films-list');
const cardsContainers = document.querySelectorAll('.films-list__container');

for (let i = 0; i < FILM_COUNT; i++) {
  renderElement(cardsContainers[0], createCardTemplate(), 'beforeend');
}

renderElement(mainContentContainer, createShowMoreButtonTemplate(), 'beforeend');


for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  renderElement(cardsContainers[1], createCardTemplate(), 'beforeend');
  renderElement(cardsContainers[2], createCardTemplate(), 'beforeend');
}
const statisticsContainer = document.querySelector('.footer__statistics');
renderElement(statisticsContainer, createFilmsQuantityTemplate(), 'beforeend');
