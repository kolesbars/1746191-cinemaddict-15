import Smart from './smart';
import dayjs from 'dayjs';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {countFilmsByGenre, makeItemsUniq, getKeyWithMaxValue, getFilmsInRange} from '../utils/statistics.js';
import {getTimeFromMins, getProfileRating} from '../utils/common.js';
import {StatsRanges} from '../const.js';

const renderChart = (statisticCtx, films) => {
  const BAR_HEIGHT = 50;
  statisticCtx.height = BAR_HEIGHT * 5;

  const filmGenres = films.map((film) => film.filmInfo.genre);
  const uniqGenres = makeItemsUniq(filmGenres);
  const filmByGenreCounts = uniqGenres.map((genre) => countFilmsByGenre(films, genre));
  getKeyWithMaxValue (uniqGenres, filmByGenreCounts);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniqGenres,
      datasets: [{
        data: filmByGenreCounts,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = (data) => {
  const {films, dateFrom, dateTo} = data;

  const filmsInRange = getFilmsInRange(dateFrom, dateTo, films);
  const watchedFilmsCount = filmsInRange.length;
  const durations = [];
  filmsInRange.forEach((film) => durations.push(film.filmInfo.duration));

  const getTotalDuration = () => {
    let totalDuration = 0;
    if (durations.length !== 0) {
      totalDuration = getTimeFromMins(durations.reduce((total, duration) => total + duration));
      return totalDuration;
    }
    return totalDuration;
  };

  const getTopGenre = () => {
    const filmGenres = filmsInRange.map((film) => film.filmInfo.genre);
    const uniqGenres = makeItemsUniq(filmGenres);
    if(uniqGenres.length !== 0) {
      const filmByGenreCounts = uniqGenres.map((genre) => countFilmsByGenre(filmsInRange, genre));
      return getKeyWithMaxValue (uniqGenres, filmByGenreCounts);
    }
    return '';
  };

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getProfileRating(films.length)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time">
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilmsCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${getTotalDuration()}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${getTopGenre()}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class StatsView extends Smart {
  constructor(films) {
    super();
    this._films = films.filter((film) => film.userDetails.isWatched === true);
    this._data = {
      films: this._films,
      dateFrom: (() => {
        const defaultDateFrom = StatsRanges.ALL_TIME;
        return dayjs().subtract(defaultDateFrom, 'day').toDate();
      })(),
      dateTo: dayjs().toDate(),
      check: 'all-time',
    };

    this._statisticChart = null;

    this._rangeChangeHandler = this._rangeChangeHandler.bind(this);

    this._setCharts();
    this._setInnerHandlers();
  }

  removeElement() {
    super.removeElement();
  }

  getTemplate() {
    return createStatsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
    this._setInnerHandlers();
  }

  _rangeChangeHandler(evt) {
    const data = new FormData(evt.currentTarget);
    const dateFrom = this._getStatsRange(data.get('statistic-filter'));
    if (!dateFrom) {
      return;
    }

    if(dateFrom === 0) {
      this.updateData({
        dateFrom: dayjs().toDate(),
      });
    }
    this.updateData({
      dateFrom: (() => dayjs().subtract(dateFrom, 'day').toDate())(),
      check: evt.target.value,
    });
  }

  _getStatsRange(value) {
    switch (value) {
      case 'today':
        return StatsRanges.TODAY;
      case 'week':
        return StatsRanges.WEEK;
      case 'month':
        return StatsRanges.MOUNTH;
      case 'year':
        return StatsRanges.YEAR;
      case 'all-time':
        return StatsRanges.ALL_TIME;
    }
  }

  _setCharts() {
    if (this._statisticChart !== null) {
      this._statisticChart = null;
    }
    const {films, dateFrom, dateTo, check} = this._data;

    Array.from(this.getElement().querySelector('.statistic__filters').children)
      .find((child) => child.value === check).checked = true;

    const filmsInRange = getFilmsInRange(dateFrom, dateTo, films);

    const statisticCtx = this.getElement().querySelector('.statistic__chart');
    this._statisticChart = renderChart(statisticCtx, filmsInRange);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._rangeChangeHandler);
  }
}
