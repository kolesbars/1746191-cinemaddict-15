import Abstract from './abstract.js';
import {getProfileRating} from '../utils/common.js';

const createRatingTemplate = (films) => {
  const watchedFilms = films.filter((film) => film.userDetails.isWatched === true);

  return `<section class="header__profile profile">
    <p class="profile__rating">${getProfileRating(watchedFilms.length)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class RatingView extends Abstract {
  constructor(films){
    super();
    this._films = films;
  }

  getTemplate() {
    return createRatingTemplate(this._films);
  }
}
