import Abstract from './abstract';

const createStatsButtonTemplate = () => '<a href="#stats" class="main-navigation__additional" data-menu-item="stats">Stats</a>';

export default class StatsButtonView extends Abstract {
  constructor() {
    super();

    this._statsClickHandler = this._statsClickHandler.bind(this);
  }

  getTemplate() {
    return createStatsButtonTemplate();
  }

  _statsClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.statsClick(evt.target);
  }

  setStatsClickHandler(callback) {
    this._callbacks.statsClick = callback;
    this.getElement().addEventListener('click', this._statsClickHandler);
  }
}
