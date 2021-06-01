import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "../model";
import { debounce } from "../utils/helpers";
import profileInfo from "../view/profileInfo";
import repoResults from "../view/repoResults";
import searchForm from "../view/searchForm";
import searchResults from "../view/searchResults";

const handleSearchUsername = async function () {
  const query = searchForm.getSearchQuery();

  if (!query) return;

  try {
    //Render an initial loading state
    searchResults.renderSpinner();

    //Get search results from API and save to state
    await model.searchUsername(query);

    //Render results to dropdown from state
    searchResults.render(model.state.search.results);
  } catch (error) {
    console.log(error);
    searchResults.renderError(error);
  }
};

//Create a debounced function to prevent fetching suggestions on every key stroke
//Can also pass an optional timeout period (in milliseconds) as second argument
const debouncedHandleSearchUsername = debounce(handleSearchUsername, 500);

const handleFetchProfile = async function () {
  const username = new URLSearchParams(window.location.search).get("username");

  if (!username) return;

  try {
    profileInfo.renderSpinner();

    await model.getUserInfo(username);

    profileInfo.render(model.state.user);
  } catch (error) {
    console.error(error);
    profileInfo.renderError();
  }
};

const handleFetchRepos = async function () {
  const username = new URLSearchParams(window.location.search).get("username");

  if (!username) return;

  try {
    repoResults.renderSpinner();

    await model.getUserRepos(username);

    repoResults.render(model.state.repositories);
  } catch (error) {
    console.error(error);
    repoResults.renderError();
  }
};

/////GLOBAL HANDLERS////////////
const handleDropdownClose = function () {
  const dropdowns = document.querySelectorAll('[role="listbox"]');

  if (dropdowns.length) {
    dropdowns.forEach((dropdown) => {
      //Check and hide dropdown if currently being displayed
      if (!dropdown.classList.contains("hidden"))
        dropdown.classList.add("hidden");
    });
  }
};

const handleMobileNavToggle = function () {
  const navBtn = document.querySelector(".nav-links-mobile-button");

  if (navBtn)
    navBtn.addEventListener("click", () => {
      const mobileNav = document.querySelector(".nav-links-mobile");

      if (mobileNav) mobileNav.classList.toggle("hidden");
    });
};

function init() {
  //Add global event listeners
  document.addEventListener("click", handleDropdownClose);
  window.addEventListener("load", handleMobileNavToggle);

  if (window.location.pathname.includes("/profile")) {
    window.addEventListener("load", handleFetchProfile);
    window.addEventListener("load", handleFetchRepos);
  }

  //Add View Handlers
  searchForm.addSearchHandler(debouncedHandleSearchUsername);
}

init();
