import PropTypes from 'prop-types';

import isNil from 'helpers/isNil';
import prop from 'helpers/prop';

import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Head from 'next/head';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { searchRepositories } from 'helpers/githubApi';
import ContainerFlex from 'components/dumb/Container/Flex';
import ListItemRepository from 'components/smart/ListItem/Repository';
import ListItemButtonLinkRepository from 'components/smart/ListItemButton/Link/Repository';
import TextFieldDebounced from 'components/dumb/TextField/Debounced';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';

// HELPERS
const qProp = prop('q');

// SSR
export const getServerSideProps = async ({ query }) => {
  const { q = null } = query || {};
  const repos = isNil(q) ? [] : await searchRepositories(q);
  return {
    props: {
      q,
      repos,
    },
  };
};

// PAGE
const Home = ({ q, repos }) => {
  const { push, query } = useRouter();

  const clientQuery = useMemo(
    () => qProp(query),
    [query],
  );

  const clientQueryMatchesSsr = useMemo(
    () => clientQuery === q,
    [clientQuery, q],
  );

  const { data, error } = useSWR(
    clientQueryMatchesSsr ? null : clientQuery,
    searchRepositories,
    { fallbackData: repos },
  );

  const loading = useMemo(
    () => !clientQueryMatchesSsr && data === repos,
    [clientQueryMatchesSsr, data, repos],
  );

  const defaultValue = useMemo(
    () => q || '',
    [q],
  );

  const onChange = useCallback(
    (e) => {
      const { value } = e?.target;
      push(`/?q=${value}`, undefined, { shallow: true });
    },
    [push],
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
        <title>Github Indicators Explorer</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        flexGrow={1}
        maxWidth="100%"
      >
        <Box
          mt={8}
          mb={8}
        >
          <Typography
            align="center"
            variant="h3"
            paragraph
            sx={{
              fontWeight: 'bold',
            }}
          >
            Github Indicators Explorer

          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
          >
            Github Indicators Explorer can help you get key metrics
            about your favourite github repositories
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" maxWidth="100%">
          <Typography
            variant="h6"
            paragraph
            sx={{
              fontWeight: 'bold',
            }}
          >
            Select a repository
          </Typography>
          <TextFieldDebounced
            variant="outlined"
            size="small"
            label="Search..."
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 16 } }}
            onChange={onChange}
            defaultValue={defaultValue}
          />
            <List
              aria-busy={loading}
              sx={{
                marginTop: 8,
                maxWidth: '100%',
                position: 'relative',
              }}
              subheader={loading && (
                <CircularProgress sx={{
                  position: 'absolute',
                  top: -40,
                  left: `calc(50% - 40px)`
                }}
                />
               )}
            >
              {data.map(({ id, fullName, description, owner }) => (
                <ListItemRepository
                  key={id}
                  listItemButtonComponent={ListItemButtonLinkRepository}
                  fullName={fullName}
                  description={description}
                  owner={owner}
                />
              ))}
            </List>
        </Box>
      </Box>
    </ContainerFlex>
  );
};

Home.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape({
    fullName: PropTypes.string,
    description: PropTypes.string,
    ownerAvatarUrl: PropTypes.string,
  })),
  q: PropTypes.string,
};

Home.defaultProps = {
  repos: [],
  q: '',
};

export default Home;
