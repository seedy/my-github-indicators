import PropTypes from 'prop-types';

import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

import { ResponsiveLine } from '@nivo/line';

// CONSTANTS
const CONFIG = {
  xScale: {
    type: 'time',
    format: '%Y-%m-%d',
    useUTC: false,
    precision: 'day',
  },
  xFormat: 'time:%Y-%m-%d',
  yScale: {
    type: 'linear',
    stacked: true,
  },
  axisBottom: {
    format: '%Y-%m-%d',
  },
};

const NOW = new Date();

// COMPONENTS
const Graph = ({ openIssuesCount, closedDates, collaboratorsCount, memberDates }) => {
  const theme = useTheme();

  const issueEvents = useMemo(
    () => [{ x: NOW, y: openIssuesCount }]
      .concat(closedDates.map((date, index) => ({
        x: new Date(date),
        y: openIssuesCount - index,
      }))),
    [openIssuesCount, closedDates],
  );

  const collaboratorEvents = useMemo(
    () => [{ x: NOW, y: collaboratorsCount }]
      .concat(memberDates.map((date, index) => ({
        x: new Date(date),
        y: collaboratorsCount - index,
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
