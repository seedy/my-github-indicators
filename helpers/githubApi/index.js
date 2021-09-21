import { Octokit } from '@octokit/rest';

import objectToCamelCase from 'helpers/objectToCamelCase';
import objectToCamelCaseMap from 'helpers/objectToCamelCase/map';

const octokit = new Octokit({
});

// HELPERS
const repositoryToCamelCase = ({ owner, ...rest }) => ({
  owner: objectToCamelCase(owner),
  ...objectToCamelCase(rest),
});

const mapRepositories = (items) => items.map(repositoryToCamelCase);

export const searchRepositories = async (q) => {
  const { data: { items } } = await octokit.rest.search.repos({
    q,
    sort: 'stars',
    order: 'desc',
  });
  return mapRepositories(items);
};

export const getRepository = async ({ owner, repo }) => {
  const { data } = await octokit.rest.repos.get({
    owner,
    repo,
  });
  return repositoryToCamelCase(data);
};

export const listRepositoryIssuesClosed = async ({ owner, repo }) => {
  const { data } = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: 'closed',
    sort: 'updated',
    direction: 'desc',
  });
  return objectToCamelCaseMap(data);
};

export const listRepositoryMemberEvents = async ({ owner, repo }) => {
  const events = await octokit.paginate(octokit.rest.activity.listRepoEvents, {
    owner,
    repo,
  });
  return objectToCamelCaseMap(events.filter((({ type, action }) => type === 'MemberEvent' && action === 'added')));
};
