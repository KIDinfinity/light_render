import React from 'react';
import { useSelector } from 'dva';
import { FormAntCard } from 'basic/components/Form';
import { NAMESPACE } from 'process/MYCLM/ClaimPaymentTrack/activity.config';
import Item from './Item';
import styles from './index.less';

const PolicyPaymentInfoList = () => {
  const policyPaymentInfoList: any =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimProcessData?.policyPaymentInfoList
    ) || [];
  return (
    <div className={styles.wrapper}>
      <FormAntCard title="Policy Payment Info">
        <div className={styles.listWrap}>
          {policyPaymentInfoList.map((item: any, idx: number) => (
            <div className={styles.item} key={idx}>
              <Item item={item} idx={idx} />
            </div>
          ))}
        </div>
      </FormAntCard>
    </div>
  );
};

export default PolicyPaymentInfoList;
