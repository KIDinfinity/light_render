import React from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Basic from './Basic';

export default () => {
  const data =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.modalData?.processData?.planInfoData
    ) || {};

  const { planInfoData = {} } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.modalData?.processData) ||
    {};

  return (
    <>
      <Basic data={data} planInfoData={planInfoData} />
    </>
  );
};
