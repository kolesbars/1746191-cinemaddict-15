import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const makeItemsUniq = (items) => {
  const arr = new Set();
  items.forEach((item) => {
    item.forEach((it) => {
      arr.add(it);
    });
  });
  return [...arr];
};

const countFilmsByGenre = (films, genre) =>
  films.filter((film) => film.filmInfo.genre.some((elem) => elem === genre)).length;

const getKeyWithMaxValue = (keys, values) => {
  let index = 0;
  let count = 0;
  for (let i = 0; i <= keys.length; i++) {
    if (values[i] > count) {
      count = values[i];
      index = i;
    }
  }
  return keys[index];
};

const getFilmsInRange = (from, to, films) => films.filter((film) =>
  dayjs(film.userDetails.watchingDate).isBetween(from, to, null, []));

export {makeItemsUniq, countFilmsByGenre, getKeyWithMaxValue, getFilmsInRange};
