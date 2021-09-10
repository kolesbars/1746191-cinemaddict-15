import {generateFilmCards} from './moc/film.js';
import PagePresenter from './presenter/page.js';
import FilterPresenter from './presenter/filters.js';
import Movies from './model/movies.js';
import Filters from './model/filters.js';

const FILM_COUNT = 25;

const films = generateFilmCards(FILM_COUNT);

const moviesModel = new Movies();
moviesModel.setMovies(films);

const filterModel = new Filters();

const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const statisticsContainer = footerContainer.querySelector('.footer__statistics');

const pagePresenter = new PagePresenter(headerContainer, mainContainer, statisticsContainer, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(mainContainer, filterModel, moviesModel);

filterPresenter.init();
pagePresenter.init();


