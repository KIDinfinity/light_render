import React from 'react';
import { useSelector } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Component from './Component';

export default ({ activitykey, setActivitykey }: any) => {
  const { planInfoData, chequeInfoList } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData) || {};

  const paymentList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.paymentList
    ) || [];

  const datas = {
    planInfoData,
    chequeInfoList,
    showOnly: true,
    activitykey,
    setActivitykey,
    paymentList,
  };

  return (
    <>
      <Component {...datas} />
    </>
  );
};
