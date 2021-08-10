
import { createElement } from '../utils.js';

const createFilmsQuantityTemplate = () => (
  '<p>130 291 movies inside</p>'
);

export default class FilmQuantityView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsQuantityTemplate();
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
