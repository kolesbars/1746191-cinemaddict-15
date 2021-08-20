import dayjs from 'dayjs';
import {getRandomInteger, getRandomFloat} from '../utils/common.js';
import {nanoid} from 'nanoid';

const COMMENTED_PERIOD = 730;
const RELEASE_PERIOD = 100;

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const rundomIndex = getRandomInteger(0, posters.length-1);

  return posters[rundomIndex];
};

const generateFilmName = () => {
  const filmNames = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'The Great Flamarion',
    'Made for Each Other',
  ];

  const rundomIndex = getRandomInteger(0, filmNames.length-1);

  return filmNames[rundomIndex];
};

const generateDescription = () => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

  const suggestions = text.split('.');
  const description = new Array(5);
  return description.fill()
    .map(() => {
      const rundomIndex = getRandomInteger(0, suggestions.length-1);
      return suggestions[rundomIndex];
    })
    .slice(0, getRandomInteger(1, description.length))
    .join();
};

const generateEmoji = () => {
  const emoji = [
    'angry.png',
    'puke.png',
    'sleeping.png',
    'smile.png',
  ];

  const rundomIndex = getRandomInteger(0, emoji.length-1);

  return emoji[rundomIndex];
};

const generateAuthor = () => {
  const authors = [
    'Tim Macoveev',
    'John Doe',
    'Djoni Dep',
    'Bred Pit',
    'Leo DiCaprio',
    'Chack Noris',
  ];

  const rundomIndex = getRandomInteger(0, authors.length-1);

  return authors[rundomIndex];
};

const generateCommentText = () => {
  const texts = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
    'Cool',
    'Nice',
  ];

  const rundomIndex = getRandomInteger(0, texts.length-1);

  return texts[rundomIndex];
};

const generateGenre = () => {
  const genres = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
    'Mystery',
  ];
  const filmGenres = [];

  const genresQuantity = getRandomInteger(1, 3);
  for (let i = 0; i < genresQuantity; i++) {
    const rundomIndex = getRandomInteger(0, genres.length-1);
    filmGenres.push(genres[rundomIndex]);
  }
  return filmGenres;
};

const generateCommentDate = () => {
  const daysGap = getRandomInteger(-COMMENTED_PERIOD, COMMENTED_PERIOD);
  const commentDate = dayjs().add(daysGap, 'day').toDate();
  return commentDate;
};

const generateReleaseDate = () => {
  const yearsGap = getRandomInteger(0, RELEASE_PERIOD);
  const releaseDate = dayjs().subtract(yearsGap, 'year').toDate();
  return releaseDate;
};

const generateDuration = () => {
  const hours = getRandomInteger(0, 3);
  const minutes = getRandomInteger(0, 60);
  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
};

const generateDirector = () => {
  const directors = [
    'Cristofer Nolan',
    'Cventin Tarantino',
    'Deny Vilnev',
    'Martin Scorsese',
    'Stiven Spilberg',
    'Stenli Cubrick',
  ];

  const rundomIndex = getRandomInteger(0, directors.length-1);

  return directors[rundomIndex];
};

const generateScreenwriters = () => {
  const screenwriters = [
    'Cristofer Nolan',
    'Cventin Tarantino',
    'Deny Vilnev',
    'Martin Scorsese',
    'Stiven Spilberg',
    'Stenli Cubric',
  ];

  const filmScreenwriters = [];
  const screenwrittersQuantity = getRandomInteger(1, 5);
  for (let i = 0; i < screenwrittersQuantity; i++) {
    const rundomIndex = getRandomInteger(0, screenwriters.length-1);
    filmScreenwriters.push(screenwriters[rundomIndex]);
  }
  return filmScreenwriters.join();
};

const generateActors = () => {
  const actors = [
    'Cristofer Nolan',
    'Cventin Tarantino',
    'Deny Vilnev',
    'Martin Scorsese',
    'Stiven Spilberg',
    'Stenli Cubric',
    'Depp',
    'Pit',
    'Cruze',
    'Downey',
  ];
  const filmActors = [];
  const actorsQuantity = getRandomInteger(1, 5);
  for (let i = 0; i < actorsQuantity; i++) {
    const rundomIndex = getRandomInteger(0, actors.length-1);
    filmActors.push(actors[rundomIndex]);
  }
  return filmActors.join();
};

const generateCountry = () => {
  const countries = [
    'USA',
    'Italy',
    'GB',
    'Japan',
    'Russia',
    'India',
  ];

  const rundomIndex = getRandomInteger(0, countries.length-1);

  return countries[rundomIndex];
};

const generateComment = () => ({
  emoji: generateEmoji(),
  author: generateAuthor(),
  text: generateCommentText(),
  date: generateCommentDate(),
});

const collectComments = () => {
  const comments = [];
  const counter = getRandomInteger(0, 5);
  for (let i = 0; i < counter; i++ ) {
    comments.push(generateComment());
  }
  return comments;
};

const generateFilmCards = (quantity) => {
  const filmCards = [];
  for (let i = 0; i < quantity; i++) {
    const card = {
      id: nanoid(),
      poster: generatePoster(),
      name: generateFilmName(),
      description: generateDescription(),
      comments: collectComments(),
      rating: getRandomFloat(0, 10),
      date: generateReleaseDate(),
      genre: generateGenre(),
      duration: generateDuration(),
      isInWatchlist: Boolean(getRandomInteger(0, 1)),
      isWatched: Boolean(getRandomInteger(0, 1)),
      isFavorite: Boolean(getRandomInteger(0, 1)),
      director: generateDirector(),
      screenwriters: generateScreenwriters(),
      actors: generateActors(),
      country: generateCountry(),
      age: getRandomInteger(0, 18),
    };
    filmCards.push(card);
  }
  return filmCards;
};

export {generateFilmCards};
