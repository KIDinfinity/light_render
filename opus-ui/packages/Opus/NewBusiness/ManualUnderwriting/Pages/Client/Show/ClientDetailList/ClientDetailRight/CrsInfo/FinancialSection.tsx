import React from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import FinancialItem from './FinancialItem';

export default ({ clientId }: any) => {
  const crtInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities.clientMap?.[clientId]?.crtInfoList,
    shallowEqual
  );

  const crtInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities.crtInfoMap,
    shallowEqual
  );

  const dataSource = lodash
    .map(crtInfoList, (id: string) => crtInfoMap[id])
    .filter((item) => {
      return item?.type === 'S' && item?.ctfType === 'TN' && item?.ctfCountryCode !== 'USA';
    });

  return (
    <div className="financialContainer">
      {dataSource?.map((item: any) => {
        return <FinancialItem clientId={clientId} item={item} key={item} />;
      })}
    </div>
  );
};
