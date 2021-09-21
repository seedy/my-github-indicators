import PropTypes from 'prop-types';

import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

import { ResponsiveLine } from '@nivo/line';

// CONSTANTS
const CONFIG = {
  margin: {
    top: 50,
    right: 60,
    bottom: 50,
    left: 60,
  },
  xScale: {
    type: 'time',
    format: 'native',
    useUTC: false,
    precision: 'day',
  },
  xFormat: 'time:%Y-%m-%d',
  yScale: {
    type: 'linear',
    stacked: 'stacked',
  },
  axisBottom: {
    type: 'time',
    format: '%B %Y',
    tickValues: 'every month',
    tickSize: 10,
  },
  axisLeft: {

  },
  enablePointLabel: true,
  useMesh: true,
};

const NOW = new Date();


// COMPONENTS
const Graph = ({ openIssuesCount, closedDates, collaboratorsCount, memberDates }) => {
  const theme = useTheme();

  const issueEvents = useMemo(
    () => [{ x: NOW, y: openIssuesCount }]
      .concat(closedDates.map((date, index) => ({
        x: new Date(date),
        y: openIssuesCount - (index + 1),
      }))),
    [openIssuesCount, closedDates],
  );

  const collaboratorEvents = useMemo(
    () => [{ x: NOW, y: collaboratorsCount }]
      .concat(memberDates.map((date, index) => ({
        x: new Date(date),
        y: collaboratorsCount - (index + 1),
      }))),
    [collaboratorsCount, memberDates],
  );

  const data = useMemo(
    () => [
      {
        id: 'issues',
        color: theme.palette.primary.main,
        data: issueEvents,
      },
      {
        id: 'collaborators',
        color: theme.palette.secondary.main,
        data: collaboratorEvents,
      },
    ],
    [theme, issueEvents, collaboratorEvents],
  );

  return (
    <ResponsiveLine
      {...CONFIG}
      data={data}
    />
  );
};

Graph.propTypes = {
  openIssuesCount: PropTypes.number.isRequired,
  collaboratorsCount: PropTypes.number.isRequired,
  closedDates: PropTypes.arrayOf(PropTypes.string),
  memberDates: PropTypes.arrayOf(PropTypes.string),

};

Graph.defaultProps = {
  closedDates: [],
  memberDates: [],
};

export default Graph;
