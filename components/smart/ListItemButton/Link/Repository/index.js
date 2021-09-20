import { forwardRef } from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import LinkRepository from '../../../Link/Repository';

// COMPONENTS
const ListItemButtonLinkRepository = forwardRef((props, ref) => (
  <ListItemButton ref={ref} component={LinkRepository} {...props} />
));

export default ListItemButtonLinkRepository;
