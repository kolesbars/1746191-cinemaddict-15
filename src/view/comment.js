import dayjs from 'dayjs';

export const createCommentTemplate = (data) => {
  const {emoji, author, text, date} = data;
  const comentsDate = dayjs(date).format('YYYY/MM/D mm:HH');

  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${comentsDate}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
};
