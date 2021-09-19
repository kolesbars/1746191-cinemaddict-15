import AbstractObserver from '../utils/observer.js';

export default class Comments extends AbstractObserver {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();

    //this._notify(updateType);
  }

  getComments() {
    return this._comments;
  }
}
