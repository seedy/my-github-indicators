import PropTypes from 'prop-types';


import { useMemo } from 'react';

import TextField from '@mui/material/TextField';
import debounce from '../../../../helpers/debounce';

// CONSTANTS
const DEFAULT_DELAY = 300;

// COMPONENTS
const TextFieldDebounced = ({ onChange, delay, ...props }) => {
  const handleChange = useMemo(
    () => debounce(onChange, delay, { leading: false, trailing: true }),
    [onChange, delay],
  );

  return (
    <TextField onChange={handleChange} {...props} />
  );
};

TextFieldDebounced.propTypes = {
  onChange: PropTypes.func.isRequired,
  delay: PropTypes.number,
};

TextFieldDebounced.defaultProps = {
  delay: DEFAULT_DELAY,
};

export default TextFieldDebounced;
