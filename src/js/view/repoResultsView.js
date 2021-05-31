import View from ".";
import { formatDate } from "../utils/helpers";
import starIcon from "url:../../assets/icons/star.svg";
import forkIcon from "url:../../assets/icons/git-fork.svg";

class RepoResultsView extends View {
  _parentElem = document.querySelector("#repo-results");
  _message = "No repositories found.";
  _repoCountElem = document.querySelector("#repo-count");

  _generateMarkup() {
    const countMarkup = this._generateCountMarkup();

    this._repoCountElem.innerHTML = this._data.count;

    return countMarkup.concat(
      this._data.items
        .map((repo) => {
          return `
        <li class="repo-result border-bottom-grey">
          <div class="repo-info">
            <span class="name"><a href="${repo.url}">${repo.name}</a></span>
            <span class="description">
              ${repo.description ?? ""}
            </span>
            <ul class="attributes">
              <li class="attribute">
                <span class="attribute-lang" style="background-color: ${
                  repo.languages?.nodes[0]?.color
                }"></span>
                <span class="attribute-value">${
                  repo.languages?.nodes[0]?.name
                }</span>
              </li>
              <li class="attribute">
                <div class="attribute-icon">
                    <img src="${starIcon}" />
                </div>
                <span class="attribute-value">${repo.stargazerCount}</span>
              </li>
              <li class="attribute">
                <div class="attribute-icon">
                    <img src="${forkIcon}" />
                </div>
                <span class="attribute-value">${repo.forkCount}</span>
              </li>
              <li class="attribute">
                <span class="attribute-icon">Updated on</span>
                <span class="attribute-value">${formatDate(
                  repo.updatedAt
                )}</span>
              </li>
            </ul>
          </div>
          <div class="repo-star">
            <button>
                <div class="icon">
                    <img src="${starIcon}" />
                </div>
              Star
            </button>
          </div>
        </li>
      `;
        })
        .join("")
    );
  }

  /**
   *
   * @returns markup for total count of repos (or first 20).
   */

  _generateCountMarkup() {
    return `
      <div class="result-summary border-bottom-grey">
        <span>
          <strong>First ${
            this._data.count > 20 ? 20 : this._data.count
          }</strong> results for
          <strong>public</strong> repositories
        </span>
      </div>
    `;
  }
}

export default new RepoResultsView();
