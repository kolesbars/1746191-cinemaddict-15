import Abstract from './abstract.js';

const createTopRatedFilmTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
    </section>`
);

export default class TopFilmsView extends Abstract {
  getTemplate() {
    return createTopRatedFilmTemplate();
  }
}
