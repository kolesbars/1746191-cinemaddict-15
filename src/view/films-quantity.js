import Abstract from './abstract.js';

const createFilmsQuantityTemplate = () => (
  '<p>130 291 movies inside</p>'
);

export default class FilmQuantityView extends Abstract {
  getTemplate() {
    return createFilmsQuantityTemplate();
  }
}
