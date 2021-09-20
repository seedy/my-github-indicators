import PropTypes from 'prop-types';

import NextLink from 'next/link';
import { forwardRef } from 'react';

// COMPONENTS
const Link = forwardRef(({
  children,
  passHref,
  href,
  ...props }, ref) => (
    <NextLink
      href={href}
      passHref={passHref}
    >
      <a ref={ref} {...props}>
        {children}
      </a>
    </NextLink>
));

Link.propTypes = {
  href: PropTypes.string.isRequired,
  passHref: PropTypes.bool,
  children: PropTypes.node,
};

Link.defaultProps = {
  children: null,
  passHref: false,
};

export default Link;
