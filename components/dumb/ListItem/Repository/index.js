import PropTypes from 'prop-types';

import { useCallback, useState } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

// COMPONENTS
const ListItemRepository = ({ fullName, description, ownerAvatarUrl }) => {
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
    >
      <ListItemButton
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
      </ListItemButton>
    </ListItem>
  );
};

ListItemRepository.propTypes = {
  fullName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ownerAvatarUrl: PropTypes.string.isRequired,
};

export default ListItemRepository;
