class SearchFormView {
  _parentElem = document.querySelector("#search");
  _usernameField = this._parentElem.querySelector("#username");

  getSearchQuery() {
    return this._usernameField.value;
  }

  addSearchHandler(handler) {
    this._usernameField.addEventListener("keyup", function () {
      handler();
    });
  }
}

export default new SearchFormView();
