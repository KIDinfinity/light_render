import React from 'react';
import { useSelector } from 'dva';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Component from './Component';

export default () => {
  const list =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.charityOrganizationList
    ) || [];

  return (
    <>
      <Component showOnly list={list} />
    </>
  );
};
