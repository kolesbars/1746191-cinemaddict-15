import {FilterType} from '../const.js';

export const filter  = {
  [FilterType.ALL] : (films) => films.filter((film) => film),
  [FilterType.WATCHLIST] : (films) => films.filter((film) => film.userDetails.isInWatchlist),
  [FilterType.HISTORY] : (films) => films.filter((film) => film.userDetails.isWatched),
  [FilterType.FAVORITES] : (films) => films.filter((film) => film.userDetails.isFavorite),
};
