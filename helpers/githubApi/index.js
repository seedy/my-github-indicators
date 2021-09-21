import { Octokit } from '@octokit/rest';

import objectToCamelCase from 'helpers/objectToCamelCase';

const octokit = new Octokit({
});

// HELPERS
const mapRepositories = (items) => items.map(({ owner, ...rest }) => ({
  owner: objectToCamelCase(owner),
  ...objectToCamelCase(rest),
}));

export const searchRepositories = async (q) => {
  const { data: { items } } = await octokit.rest.search.repos({
    q,
    sort: 'stars',
    order: 'desc',
  });
  return mapRepositories(items);
};
