import PropTypes from 'prop-types';

import {
  listRepositoryMemberEvents, listRepositoryIssuesClosed, getRepository,
} from 'helpers/githubApi';
import path from 'helpers/path';
import prop from 'helpers/prop';

import { useMemo } from 'react';

import Head from 'next/head';
import ContainerFlex from 'components/dumb/Container/Flex';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LinkHome from 'components/smart/Link/Home';
import HeroRepository from 'components/dumb/Hero/Repository';
import Graph from 'components/dumb/Graph';

// HELPERS
const createdAtProp = prop('createdAt');
const updatedAtProp = prop('updatedAt');
const descriptionProp = prop('description');
const openIssuesProp = prop('openIssues');
const ownerAvatarUrlPath = path(['owner', 'avatarUrl']);

const getData = async (params) => {
  const repository = await getRepository(params);
  const memberEvents = await listRepositoryMemberEvents(params);
  const issuesClosed = await listRepositoryIssuesClosed(params);
  return {
    repository,
    memberEvents,
    issuesClosed,
  };
};

// SSR
export const getServerSideProps = async ({ params: { owner, repo } }) => {
  const data = await getData({ owner, repo });

  return {
    props: {
      owner,
      repo,
      ...data,
    },
  };
};

// PAGE
const OwnerRepo = ({ owner, repo, repository, memberEvents, issuesClosed }) => {
  const fullName = useMemo(
    () => `${owner}/${repo}`,
    [owner, repo],
  );

  const ownerAvatarUrl = useMemo(
    () => ownerAvatarUrlPath(repository),
    [repository],
  );

  const description = useMemo(
    () => descriptionProp(repository),
    [repository],
  );

  const openIssues = useMemo(
    () => openIssuesProp(repository),
    [repository],
  );

  const closedDates = useMemo(
    () => issuesClosed.map(updatedAtProp),
    [issuesClosed],
  );

  const collaboratorsCount = useMemo(
    () => memberEvents.length + 1,
    [memberEvents],
  );

  const memberDates = useMemo(
    () => memberEvents.map(createdAtProp),
    [memberEvents],
  );

  return (
    <ContainerFlex
      component={Box}
      maxWidth={false}
      minHeight="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Head>
        <title>
          {fullName}
        </title>
      </Head>
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        width="100%"
      >
        <Box my={8} width="100%">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            underline="hover"
            component={LinkHome}
            sx={{
              fontWeight: 'bold',
            }}
          >
            Choose another repository

          </Link>
          <HeroRepository
            fullName={fullName}
            ownerAvatarUrl={ownerAvatarUrl}
            description={description}
            mt={2}
          />
          <Box width="100%" height={500}>
            <Graph
              openIssuesCount={openIssues}
              closedDates={closedDates}
              collaboratorsCount={collaboratorsCount}
              memberDates={memberDates}
            />
          </Box>
        </Box>
      </Box>
    </ContainerFlex>
  );
};

OwnerRepo.propTypes = {
  owner: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  repository: PropTypes.shape({
    description: PropTypes.string,
    owner: PropTypes.shape({
      avatarUrl: PropTypes.string,
    }),
  }).isRequired,
  memberEvents: PropTypes.arrayOf(PropTypes.object),
  issuesClosed: PropTypes.arrayOf(PropTypes.object),
};

OwnerRepo.defaultProps = {
  memberEvents: null,
  issuesClosed: null,
};

export default OwnerRepo;
