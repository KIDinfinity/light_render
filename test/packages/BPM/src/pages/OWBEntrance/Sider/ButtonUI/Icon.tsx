import React from 'react';
import { Icon } from 'antd';
import getIcon from './icon.config';

export default ({ icon, status }: any) => {
  const IconSvg = getIcon({ icon, status });
  return <React.Suspense fallback={null}>{IconSvg && <Icon component={IconSvg} />}</React.Suspense>;
};
