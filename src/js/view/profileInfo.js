import View from ".";

class ProfileInfoView extends View {
  _parentElem = document.querySelector("#profile-info");
  _message = "No user found. Please try searching for another username.";

  _generateMarkup() {
    return `
      <img
        src="${this._data.avatarUrl || ""}"
        alt="${this._data.name || ""}"
        class="profile-image"
      />
      <div class="profile-info">
        <h4 class="profile-name">${this._data.name || ""}</h4>
        <span class="profile-login">${this._data.login || ""}</span>
      </div>
      <div class="profile-bio">
        ${this._data.bio || ""}
      </div>
    `;
  }
}

export default new ProfileInfoView();
