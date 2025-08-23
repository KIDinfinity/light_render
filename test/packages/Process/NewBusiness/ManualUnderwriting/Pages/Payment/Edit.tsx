import React from 'react';
import { useSelector } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Component from './ComponentEdit';

export default ({ activitykey, setActivitykey }: any) => {
  const { planInfoData = {}, chequeInfoList = [] } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.modalData?.processData) ||
    {};
  const paymentList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.modalData?.processData?.paymentList
    ) || [];

  const datas = {
    planInfoData,
    chequeInfoList,
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
