import Abstract from './abstract.js';

const createFilmsQuantityTemplate = (films) => `<p>${films.length} movies inside</p>`;

export default class FilmQuantityView extends Abstract {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilmsQuantityTemplate(this._films);
  }
}
