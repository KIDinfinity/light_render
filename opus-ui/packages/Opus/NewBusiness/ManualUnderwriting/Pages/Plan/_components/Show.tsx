import React from 'react';
import { useSelector } from 'dva';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Basic from './Basic';

export default () => {
  const data =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData
    ) || {};

  const { planInfoData } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData
  );

  return (
    <>
      <Basic showOnly data={data} planInfoData={planInfoData} />
    </>
  );
};
