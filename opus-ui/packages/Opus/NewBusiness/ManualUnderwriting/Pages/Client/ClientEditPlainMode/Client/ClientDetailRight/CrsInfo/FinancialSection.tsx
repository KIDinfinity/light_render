import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import FinancialItem from './FinancialItem';
import AddFinancial from './AddFinancial';

export default ({ clientId }: any) => {
  let crtInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.crtInfoList
  );
  const crtInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData.entities?.crtInfoMap
  );
  crtInfoList = lodash.filter(crtInfoList, (id) => {
    return crtInfoMap?.[id].ctfType === 'TN' && crtInfoMap?.[id].ctfCountryCode !== 'US';
  });
  return (
    <>
      {crtInfoList?.map((item: any) => {
        return <FinancialItem clientId={clientId} id={item} key={item} />;
      })}
      <AddFinancial clientId={clientId} crtInfoList={crtInfoList} />
    </>
  );
};
