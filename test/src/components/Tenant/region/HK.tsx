import type React from 'react';
import tenant from '../tenantObj';

export default ({ children, match = true }: any): React.ReactComponentElement<any> => {
  const show = (match && tenant.isHK()) || (!match && !tenant.isHK());

  return show && children;
};
