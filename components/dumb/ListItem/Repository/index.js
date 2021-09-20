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
      sx={{
        '& .MuiListItemSecondaryAction-root': {
          right: 48,
        },
      }}
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={fullName} src={ownerAvatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={fullName}
          secondary={description}
        />
        {selectVisible && (
        <Button
          color="primary"
          size="small"
        >
          Select
        </Button>
        )}
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
