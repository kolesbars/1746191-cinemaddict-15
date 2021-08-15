const RenderPosition = {
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

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

  film.setShowPopupClickHandler(() => {
    const popupElement = bodyElement.querySelector('.film-details');

    if (popupElement) {
      popupElement.remove();
    }

    bodyElement.appendChild(popup.getElement());
    bodyElement.classList.add('hide-overflow');
  });

  popup.setCloseButtonClickHandler(() => {
    bodyElement.removeChild(popup.getElement());
    bodyElement.classList.remove('hide-overflow');
  });
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {renderElement, RenderPosition, createElement, renderPopup};
