const generateFilters = (films) => ({
  all:  films.length,
  wathclist:  films.filter((film) => film.isInWatchlist).length,
  hystory: films.filter((film) => film.isWatched).length,
  favorites:  films.filter((film) => film.isFavorite).length,
});

export {generateFilters};
