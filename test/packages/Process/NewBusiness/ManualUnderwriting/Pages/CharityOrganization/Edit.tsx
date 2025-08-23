import React from 'react';
import { useSelector } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Component from './Component';

export default ({ renderTooltipKey }) => {
  const list =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.modalData.processData?.charityOrganizationList
    ) || [];

  return (
    <>
      <Component list={list} renderTooltipKey={renderTooltipKey} />
    </>
  );
};
