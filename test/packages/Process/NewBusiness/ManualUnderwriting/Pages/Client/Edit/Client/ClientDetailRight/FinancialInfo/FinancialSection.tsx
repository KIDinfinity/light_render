import React from 'react';
import { useSelector } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { tenant, Region } from '@/components/Tenant';
import FinancialItem from './FinancialItem';
import AddFinancial from './AddFinancial';
import styles from './index.less';
import useJudgeDisplayFinancialInfoTable from 'process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useJudgeDisplayFinancialInfoTable';

export default ({ clientId }: any) => {
  const crtInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.crtInfoList
  );

  const display = useJudgeDisplayFinancialInfoTable({
    clientId,
  });

  const isShow = tenant.region({
    [Region.PH]: false,
    [Region.TH]: false,
    [Region.KH]: false,
    [Region.MY]: true,
    [Region.ID]: true,
    notMatch: display,
  });

  return isShow ? (
    <div className={styles.financialContainer}>
      {crtInfoList?.map((item: any) => {
        return <FinancialItem clientId={clientId} id={item} key={item} />;
      })}
      <AddFinancial clientId={clientId} crtInfoList={crtInfoList} />
    </div>
  ) : null;
};
