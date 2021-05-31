import API from "../utils/api";

//Creating a state makes it easy to do stuff like data persistence or data collection
export const state = {
  search: {
    query: "",
    results: [],
  },
  user: {},
  repositories: { count: 0, items: [] },
};

export const searchUsername = async function (query) {
  state.search.query = query;

  try {
    const data = await API.searchUsername(query);

    state.search.results = data.data.search.nodes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserInfo = async function (username) {
  try {
    const data = await API.getUserInfo(username);

    state.user = data.data.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserRepos = async function (username) {
  try {
    const { data } = await API.getUserRepos(username);

    state.repositories.count = data.user.repositories.totalCount;
    state.repositories.items = data.user.repositories.nodes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
