import Abstract from './abstract.js';

const createShowMoreButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class ShowMoreView extends Abstract {
  constructor () {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callbacks.click();
  }

  setClickHandler(callback) {
    this._callbacks.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
