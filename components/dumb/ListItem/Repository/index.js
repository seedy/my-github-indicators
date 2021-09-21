import PropTypes from 'prop-types';

import { forwardRef, useCallback, useState } from 'react';

import useIsXs from 'hooks/useIsXs';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

// COMPONENTS
const ListItemButtonDefault = ({ fullName, ...props }) => <ListItemButton {...props} />;
ListItemButtonDefault.propTypes = {
  fullName: PropTypes.string,
};
ListItemButtonDefault.defaultProps = {
  fullName: undefined,
};

const ListItemRepository = forwardRef(({
  fullName, description, ownerAvatarUrl, listItemButtonComponent: ListItemButtonComponent, ...props
}, ref) => {
  const [selectVisible, setSelectVisible] = useState(false);

  const isXs = useIsXs();

  const onMouseEnter = useCallback(
    () => {
      setSelectVisible(true);
    },
    [setSelectVisible],
  );

  const onMouseLeave = useCallback(
    () => {
      setSelectVisible(false);
    },
    [setSelectVisible],
  );

  return (
    <ListItem
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      alignItems="flex-start"
      ref={ref}
      {...props}
    >
      <ListItemButtonComponent
        fullName={fullName}
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <ListItemAvatar>
          <Avatar alt={fullName} src={ownerAvatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={fullName}
          primaryTypographyProps={{
            noWrap: true,
          }}
          secondary={description}
          secondaryTypographyProps={{
            color: 'textSecondary',
          }}
        />
        {!isXs && (
          <Button
            color="primary"
            size="small"
            sx={{
              opacity: selectVisible ? 1 : 0,
              pointerEvents: 'none',
              fontWeight: 'bold',
            }}
          >
            Select
          </Button>
        )}
      </ListItemButtonComponent>
    </ListItem>
  );
});

ListItemRepository.displayName = 'ListItemRepository';

ListItemRepository.propTypes = {
  fullName: PropTypes.string.isRequired,
  description: PropTypes.string,
  ownerAvatarUrl: PropTypes.string.isRequired,
  listItemButtonComponent: PropTypes.elementType,
};

ListItemRepository.defaultProps = {
  description: '',
};

ListItemRepository.defaultProps = {
  listItemButtonComponent: ListItemButtonDefault,
};

export default ListItemRepository;
