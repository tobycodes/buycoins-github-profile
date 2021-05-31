import { API_URL, TIMEOUT_SECS } from "./constants";

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const base = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${process.env.GITHUB_PAT}`,
  },
};

export default {
  searchUsername: async function (query) {
    try {
      const config = {
        ...base,
        body: JSON.stringify({
          query: `
            query searchUsername($query: String!) {
              search(first: 6, type: USER, query: $query) {
                nodes {
                  ... on User {
                    login
                    id
                    avatarUrl
                  }
                }
              }
            }
          `,
          variables: { query },
        }),
      };

      const res = await Promise.race([
        fetch(API_URL, config),
        timeout(TIMEOUT_SECS),
      ]);

      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);

      return data;
    } catch (error) {
      throw error;
    }
  },

  getUserInfo: async function (username) {
    try {
      const config = {
        ...base,
        body: JSON.stringify({
          query: `
            query getUserInfo($username: String!) {
              user(login: $username) {
                avatarUrl
                bio
                login
                name
              }
            }
          `,
          variables: { username },
        }),
      };

      const res = await Promise.race([
        fetch(API_URL, config),
        timeout(TIMEOUT_SECS),
      ]);

      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);

      return data;
    } catch (error) {
      throw error;
    }
  },

  getUserRepos: async function (username) {
    try {
      const config = {
        ...base,
        body: JSON.stringify({
          query: `
            query getUserRepos($username: String!) {
              user(login: $username) {
                repositories(first: 20, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
                  totalCount
                  nodes {
                    name
                    url
                    description
                    updatedAt
                    stargazerCount
                    forkCount
                    languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                      nodes {
                        color
                        name
                      }
                    }
                  }
                }
              }
            }

          `,
          variables: { username },
        }),
      };

      const res = await Promise.race([
        fetch(API_URL, config),
        timeout(TIMEOUT_SECS),
      ]);

      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);

      return data;
    } catch (error) {
      throw error;
    }
  },
};
