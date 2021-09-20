import { forwardRef } from 'react';
import Link from '../index';

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
