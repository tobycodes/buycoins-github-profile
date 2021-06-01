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
        <li role="option">
          <a class="search-result" href="/profile?username=${user.login}">
            <div class="search-result-value">
              <div class="search-result-image">
                <img src="${user.avatarUrl}" alt="${user.login}" />
              </div>
              <span class="search-result-text">${user.login}</span>
            </div>
            <button type="button" class="search-result-button">
              View
            </button>
          </a>
        </li>
    `
      )
      .join("");
  }
}

export default new SearchResultsView();
