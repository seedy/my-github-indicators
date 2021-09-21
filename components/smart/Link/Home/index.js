import { forwardRef } from 'react';
import Link from 'components/smart/Link';

// COMPONENTS
const LinkHome = forwardRef(({
  ...props
}, ref) => (
  <Link
    ref={ref}
    href="/"
    {...props}
  />
));

export default LinkHome;
