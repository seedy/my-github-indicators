import PropTypes from 'prop-types';

import { forwardRef } from 'react';
import Link from 'components/smart/Link/index';

// COMPONENTS
const LinkRepository = forwardRef(({
  fullName,
  ...props
}, ref) => (
  <Link
    ref={ref}
    href={`/repos/${fullName}`}
    {...props}
  />
));

LinkRepository.propTypes = {
  fullName: PropTypes.string.isRequired,
};

export default LinkRepository;
