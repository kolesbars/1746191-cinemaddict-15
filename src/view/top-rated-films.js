import { createElement } from '../utils.js';

const createTopRatedFilmTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
    </section>`
);

export default class TopFilmsView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTopRatedFilmTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}