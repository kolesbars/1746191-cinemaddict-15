import dayjs from 'dayjs';

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;

  if(minutes !== 0 && hours !== 0) {
    return `${hours}h ${minutes}m`;
  }
  if(minutes === 0) {
    return `${hours}h`;
  }
  return `${minutes}m`;
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  if (weight !== null) {
    return weight;
  }

  return dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

const sortByRating = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.rating, filmB.filmInfo.rating);

  if (weight !== null) {
    return weight;
  }

  return filmB.filmInfo.rating - filmA.filmInfo.rating;
};

const getProfileRating = (elements) => {
  if(elements >= 1 && elements < 10) {
    return 'novice';
  }
  if (elements >= 10 && elements < 20) {
    return 'fan';
  }
  if (elements >= 21) {
    return 'movie buf';
  }
  if (elements === 0){
    return '';
  }
};

export {
  sortByDate,
  sortByRating,
  getTimeFromMins,
  getProfileRating
};
