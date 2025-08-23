import React from 'react';
import { useSelector } from 'dva';

import { FormAntCard } from 'basic/components/Form';
import { NAMESPACE } from 'process/MYCLM/ClaimPaymentTrack/activity.config';

import Item from './Item';

import styles from './index.less';

const PaymentTrackDetailList = () => {
  const paymentTrackDetailList: any =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimProcessData?.paymentTrackDetailList
    ) || [];

  return (
    <div className={styles.wrapper}>
      <FormAntCard title="Payment Track Detail">
        <div className={styles.listWrap}>
          {paymentTrackDetailList.map((item: any, idx: number) => (
            <div className={styles.item} key={idx}>
              <Item item={item} idx={idx} />
            </div>
          ))}
        </div>
      </FormAntCard>
    </div>
  );
};

export default PaymentTrackDetailList;
