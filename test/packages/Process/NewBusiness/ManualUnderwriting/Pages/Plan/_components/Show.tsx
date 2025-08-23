import React from 'react';
import { useSelector } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Basic from './Basic';

export default () => {
  const data =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData
    ) || {};

  return (
    <>
      <Basic showOnly data={data} />
    </>
  );
};
