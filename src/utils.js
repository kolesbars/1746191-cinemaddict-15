const RenderPosition = {
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(1);

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

const bodyElement = document.querySelector('body');

const renderPopup = (film, popup) => {
  film.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    const popupElement = bodyElement.querySelector('.film-details');

    if (popupElement) {
      popupElement.remove();
    }

    bodyElement.appendChild(popup.getElement());
    bodyElement.classList.add('hide-overflow');
  });

  film.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    const popupElement = bodyElement.querySelector('.film-details');

    if (popupElement) {
      popupElement.remove();
    }

    bodyElement.appendChild(popup.getElement());
    bodyElement.classList.add('hide-overflow');
  });
  film.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    const popupElement = bodyElement.querySelector('.film-details');

    if (popupElement) {
      popupElement.remove();
    }

    bodyElement.appendChild(popup.getElement());
    bodyElement.classList.add('hide-overflow');
  });
  const popupCloseButton = popup.getElement().querySelector('.film-details__close-btn');

  popupCloseButton.addEventListener('click', () => {
    bodyElement.removeChild(popup.getElement());
    bodyElement.classList.remove('hide-overflow');
  });
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {getRandomInteger, getRandomFloat, renderElement, RenderPosition, createElement, renderPopup};
