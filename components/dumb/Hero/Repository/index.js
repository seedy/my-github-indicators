import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const HeroRepository = ({ fullName, description, ownerAvatarUrl, ...props }) => (
  <Box display="flex" flexDirection="column" {...props}>
    <Box mb={2} display="flex" flexDirection="row" alignItems="center">
      <Avatar sx={{ marginRight: 2 }} variant="rounded" alt={fullName} src={ownerAvatarUrl} />
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          '&:first-letter': {
            textTransform: 'uppercase',
          },
        }}
      >
        {fullName}
      </Typography>
    </Box>
    <Typography variant="subtitle1" color="textSecondary">{description}</Typography>
  </Box>
);

HeroRepository.propTypes = {
  fullName: PropTypes.string.isRequired,
  description: PropTypes.string,
  ownerAvatarUrl: PropTypes.string.isRequired,
};

HeroRepository.defaultProps = {
  description: '',
};

export default HeroRepository;
