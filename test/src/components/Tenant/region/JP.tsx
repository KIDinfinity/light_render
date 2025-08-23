import type React from 'react';
import tenant from '../tenantObj';

export default ({ children, match = true }: any): React.ReactComponentElement<any> => {
  const show = (match && tenant.isJP()) || (!match && !tenant.isJP());

  return show && children;
};
