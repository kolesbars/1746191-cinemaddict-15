const generateFilters = (films) => ({
  all:  films.length,
  wathclist:  films.filter((film) => film.userDetails.isInWatchlist).length,
  hystory: films.filter((film) => film.userDetails.isWatched).length,
  favorites:  films.filter((film) => film.userDetails.isFavorite).length,
});

export {generateFilters};
