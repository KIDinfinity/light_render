import React from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import FinancialItem from './FinancialItem';
import styles from './index.less';

export default ({ clientId }: any) => {
  const crtInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.crtInfoList
  );

  return (
    <div className={styles.financialContainer}>
      {crtInfoList?.map((item: any) => {
        return <FinancialItem clientId={clientId} id={item} key={item} />;
      })}
    </div>
  );
};
