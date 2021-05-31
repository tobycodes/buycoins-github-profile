import { isEmpty } from "../utils/helpers";

export default class View {
  _data;
  _message;

  /**
   * Performs cleanup on view. Always called internally before a render method
   */
  _clear() {
    this._parentElem.innerHTML = "";
  }

  /**
   * Sets internal state to data provided, uses _generateMarkup method to generate markup with data and renders it to view.
   * @param data {any}
   */
  render(data) {
    if (isEmpty(data)) {
      return this.renderMessage();
    }

    this._data = data;
    const markup = this._generateMarkup();
    this?._prepareRender();
    this._clear();
    this._parentElem.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Renders a loader to the view.
   */
  renderSpinner() {
    //Do something before rendering anything into view!
    this?._prepareRender();

    const markup = `
    <div class="message">
      <p>Loading...</p>
    </div>
  `;

    this._clear();
    this._parentElem.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Renders a custom message to the view.
   * @param message {String} Defaults to an internal _message property.
   */
  renderMessage(message = this._message) {
    this?._prepareRender();

    const markup = `
      <div class="message">
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElem.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Renders a custom error message to the view.
   * @param message {String} Defaults to an internal _errorMessage property.
   */
  renderError(message = this._errorMessage) {
    this?._prepareRender();

    const markup = `
      <div class="message error">
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElem.insertAdjacentHTML("afterbegin", markup);
  }
}
