import dayjs from 'dayjs';
import he from 'he';

const createCommentTemplate = (data, deletingCommentId) => {
  const {emotion, author, comment, date, id} = data;
  const commentsDate = dayjs(date).format('YYYY/MM/D mm:HH');
  let deleteButtonText = 'Delete';

  if (deletingCommentId === id) {
    deleteButtonText = 'Deleting...';
  }

  return `<li class="film-details__comment" id='${id}'>
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${he.encode(comment)}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${commentsDate}</span>
                <button class="film-details__comment-delete" ${deletingCommentId === id ? 'disabled' : ''}>${deleteButtonText}</button>
              </p>
            </div>
          </li>`;
};

export default class CommentView {
  constructor(comment, deleting, disable) {
    this._comment = comment;
    this._element = null;
    this._deleting = deleting;
    this._disable = disable;
  }

  getTemplate() {
    return createCommentTemplate(this._comment, this._deleting, this._disable);
  }

  removeElement() {
    this._element = null;
  }
}
