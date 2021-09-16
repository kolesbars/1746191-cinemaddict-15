import {generateFilmCards} from './moc/film.js';
import PagePresenter from './presenter/page.js';
import FilterPresenter from './presenter/filters.js';
import Movies from './model/movies.js';
import Filters from './model/filters.js';
import {renderElement, remove} from './utils/render.js';
import StatsView from './view/stats.js';

const FILM_COUNT = 25;

const films = generateFilmCards(FILM_COUNT);

const moviesModel = new Movies();
moviesModel.setMovies(films);
const filterModel = new Filters();
let statsComponent = new StatsView(moviesModel.getMovies());

const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const statisticsContainer = footerContainer.querySelector('.footer__statistics');


const pagePresenter = new PagePresenter(headerContainer, mainContainer, statisticsContainer, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(mainContainer, filterModel, moviesModel);

const handleMenuItemsClick = (type) => {
  if(type === 'stats') {
    pagePresenter._destroy();
    statsComponent = new StatsView(moviesModel.getMovies());
    renderElement(mainContainer, statsComponent.getElement());
    mainContainer.querySelector('.main-navigation__additional')
      .classList.add('main-navigation__item--active');
  } else {
    if (mainContainer.lastChild === statsComponent.getElement()) {
      remove(statsComponent);
      mainContainer.querySelector('.main-navigation__additional')
        .classList.remove('main-navigation__item--active');
      pagePresenter.init();
    }

  }
};

filterPresenter.init(handleMenuItemsClick);
pagePresenter.init();

