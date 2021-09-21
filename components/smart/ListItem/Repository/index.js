import PropTypes from 'prop-types';
import { forwardRef, useMemo } from 'react';

import propAvatarUrl from 'helpers/prop/avatarUrl';

import DumbListItemRepository from 'components/dumb/ListItem/Repository';

// COMPONENTS
const ListItemRepository = forwardRef(({ owner, fullName, description, ...props }, ref) => {
  const ownerAvatarUrl = useMemo(
    () => propAvatarUrl(owner),
    [owner],
  );
  return (
    <DumbListItemRepository
      ref={ref}
      ownerAvatarUrl={ownerAvatarUrl}
      fullName={fullName}
      description={description}
      {...props}
    />
  );
});

ListItemRepository.propTypes = {
  owner: PropTypes.shape({
    avatarUrl: PropTypes.string,
  }).isRequired,
  fullName: PropTypes.string.isRequired,
  description: PropTypes.string,
};

ListItemRepository.defaultProps = {
  description: '',
};

export default ListItemRepository;
