import PagePresenter from './presenter/page.js';
import FilterPresenter from './presenter/filters.js';
import Movies from './model/movies.js';
import Filters from './model/filters.js';
import {renderElement, remove} from './utils/render.js';
import StatsView from './view/stats-view.js';
import Api from './api.js';
import {UpdateType} from './const.js';

const AUTHORIZATION = 'Basic 2uey65ae55ea56';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';

const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new Movies();

const filterModel = new Filters();
let statsComponent = new StatsView(moviesModel.getMovies());

const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const statisticsContainer = footerContainer.querySelector('.footer__statistics');

const pagePresenter = new PagePresenter(headerContainer, mainContainer, statisticsContainer, moviesModel, filterModel, api);

const handleMenuItemsClick = (type) => {
  if(type === 'stats') {
    pagePresenter.destroy();
    statsComponent = new StatsView(moviesModel.getMovies());
    renderElement(mainContainer, statsComponent.getElement());
    mainContainer.querySelector('.main-navigation__additional')
      .classList.add('main-navigation__item--active');
    mainContainer.querySelectorAll('.main-navigation__item').forEach((item) => {
      item.classList.remove('main-navigation__item--active');
    });
  } else {
    if (mainContainer.lastChild === statsComponent.getElement()) {
      remove(statsComponent);
      mainContainer.querySelector('.main-navigation__additional')
        .classList.remove('main-navigation__item--active');
      pagePresenter.init();
    }

  }
};

const filterPresenter = new FilterPresenter(mainContainer, filterModel, moviesModel, handleMenuItemsClick);

filterPresenter.init();
pagePresenter.init();

api.getFilms()
  .then((films) => {
    moviesModel.setMovies(UpdateType.INIT, films);
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
  });

