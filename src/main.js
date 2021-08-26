import {generateFilmCards} from './moc/film.js';
import {generateFilters} from './moc/filters.js';
import PagePresenter from './presenter/page.js';

const FILM_COUNT = 25;

const cardsData = generateFilmCards(FILM_COUNT);
const filters = generateFilters(cardsData);

const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const statisticsContainer = footerContainer.querySelector('.footer__statistics');

const pagePresenter = new PagePresenter(headerContainer, mainContainer, statisticsContainer);
pagePresenter.init(cardsData, filters);

