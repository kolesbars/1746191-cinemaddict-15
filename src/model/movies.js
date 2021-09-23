import AbstractObserver from '../utils/abstract-observer.js';

export default class Movies extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        filmInfo: {
          name: film.film_info['title'],
          altName: film.film_info['alternative_title'],
          rating: film.film_info['total_rating'],
          age: film.film_info['age_rating'],
          screenwriters: film.film_info['writers'],
          duration: film.film_info['runtime'],
          poster: film.film_info['poster'],
          description: film.film_info['description'],
          genre: film.film_info['genre'],
          director: film.film_info['director'],
          actors: film.film_info['actors'],
          release: {
            date: film.film_info.release.date !== null ? new Date(film.film_info.release.date) :
              film.film_info.release.date,
            country: film.film_info.release['release_country'],
          },
        },
        userDetails: {
          isInWatchlist: film.user_details['watchlist'],
          isWatched: film.user_details['already_watched'],
          isFavorite: film.user_details['favorite'],
          watchingDate:  film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) :
            film.user_details.watching_date,
        },
      },
    );

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'film_info': {
          'title': film.filmInfo.name,
          'alternative_title': film.filmInfo.altName,
          'total_rating': film.filmInfo.rating,
          'age_rating': film.filmInfo.age,
          'writers': film.filmInfo.screenwriters,
          'runtime': film.filmInfo.duration,
          'poster': film.filmInfo.poster,
          'description': film.filmInfo.description,
          'genre': film.filmInfo.genre,
          'director': film.filmInfo.director,
          'actors': film.filmInfo.actors,
          'release': {
            'date': film.filmInfo.release.date instanceof Date ? film.filmInfo.release.date.toISOString() : null,
            'release_country': film.filmInfo.release.country,
          },
        },
        'user_details': {
          'watchlist': film.userDetails.isInWatchlist,
          'already_watched': film.userDetails.isWatched,
          'favorite': film.userDetails.isFavorite,
          'watching_date':  film.userDetails.watchingDate instanceof Date ?
            film.userDetails.watchingDate.toISOString() : null,
        },
      },
    );

    delete adaptedFilm.userDetails;
    delete adaptedFilm.filmInfo;

    return adaptedFilm;
  }
}
