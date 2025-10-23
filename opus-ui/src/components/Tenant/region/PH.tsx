import type React from 'react';
import tenant from '../tenantObj';

export default ({ children, match = true }: any): React.ReactComponentElement<any> => {
  const show = (match && tenant.isPH()) || (!match && !tenant.isPH());

  return show && children;
};
