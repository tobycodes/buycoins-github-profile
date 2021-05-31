import View from ".";

class SearchResultsView extends View {
  _parentElem = document.querySelector(".search-results");
  _message = "No results found. Please try another query.";

  _prepareRender() {
    return this._parentElem.classList.remove("hidden");
  }

  _generateMarkup() {
    return this._data
      .map(
        (user) => `
        <li class="search-result" role="option">
          <div class="search-result-value">
            <div class="search-result-image">
              <img src="${user.avatarUrl}"></img>
            </div>
            <span class="search-result-text">${user.login}</span>
          </div>
          <button type="button" class="search-result-button">
            <a href="/profile?username=${user.login}">View</a>
          </button>
        </li>
    `
      )
      .join("");
  }
}

export default new SearchResultsView();
