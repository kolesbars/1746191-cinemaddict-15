const UpdateType = {
  CARD: 'CARD',
  FILMS: 'FILMS',
  POPUP: 'POPUP',
  FILTER: 'FILTER',
};

const FilterType = {
  ALL : 'all',
  WATCHLIST : 'watchlist',
  HISTORY : 'watched',
  FAVORITES : 'favorites',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const Genres = {
  MUSICAL: 'Musical',
  WESTERN: 'Western',
  DRAMMA: 'Drama',
  COMEDY: 'Comedy',
  CARTOON: 'Cartoon',
  MYSTERY: 'Mystery',
};

const StatsRanges = {
  ALL_TIME: 40000,
  TODAY: 1,
  WEEK: 6,
  MOUNTH: 30,
  YEAR: 365,
};

export {UpdateType, FilterType, SortType, Genres, StatsRanges};
