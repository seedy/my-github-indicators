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
    left: 40,
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
    format: '%d %B %Y',
    tickSize: 10,
  },
  axisLeft: {
    legend: 'Count',
    legendOffset: -30,
    legendPosition: 'middle',
  },
  legends: [{
    anchor: 'top-left',
    direction: 'column',
    justify: false,
    translateX: 0,
    translateY: -50,
    itemsSpacing: 0,
    itemDirection: 'left-to-right',
    itemWidth: 80,
    itemHeight: 20,
    itemOpacity: 0.75,
    symbolSize: 12,
    symbolShape: 'circle',
    symbolBorderColor: 'rgba(0, 0, 0, .5)',
  }],
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
