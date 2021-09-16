import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(1);

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
  const weight = getWeightForNullDate(filmA.date, filmB.date);

  if (weight !== null) {
    return weight;
  }

  return dayjs(filmB.date).diff(dayjs(filmA.date));
};

const sortByRating = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.rating, filmB.rating);

  if (weight !== null) {
    return weight;
  }

  return filmB.rating - filmA.rating;
};

const sortByComments = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.comments, filmB.comments);

  if (weight !== null) {
    return weight;
  }

  return filmB.comments.length - filmA.comments.length;
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

export {getRandomInteger, getRandomFloat, sortByDate, sortByRating, sortByComments, getTimeFromMins, getProfileRating};
