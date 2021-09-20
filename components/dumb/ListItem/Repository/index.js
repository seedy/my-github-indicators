import PropTypes from 'prop-types';

import { forwardRef, useCallback, useState } from 'react';

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

  const onToggleVisible = useCallback(
    () => {
      setSelectVisible((prevVisible) => !prevVisible);
    },
    [setSelectVisible],
  );

  return (
    <ListItem
      onMouseEnter={onToggleVisible}
      onMouseLeave={onToggleVisible}
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
        <Button
          color="primary"
          size="small"
          sx={{
            opacity: selectVisible ? 1 : 0,
            pointerEvents: 'none',
          }}
        >
          Select
        </Button>
      </ListItemButtonComponent>
    </ListItem>
  );
});

ListItemRepository.propTypes = {
  fullName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ownerAvatarUrl: PropTypes.string.isRequired,
  listItemButtonComponent: PropTypes.elementType,
};

ListItemRepository.defaultProps = {
  listItemButtonComponent: ListItemButtonDefault,
};

export default ListItemRepository;
