import React from 'react';

import { useGetBankInfo } from '../../_hooks';

import Item from './Item';

import styles from '../../index.less';
interface IParams {
  showOnly: boolean;
  planInfoData: any;
  bankInfoList: any;
}
// TODO：这个还没有调
export default ({ planInfoData = {}, showOnly }: IParams) => {
  const { bankInfoList = [] } = planInfoData;

  const bankInfo = useGetBankInfo({ type: 'P', bankInfoList });

  return (
    <>
      <div className={styles.paymentItemWrap}>
        <div className={styles.content}>
          <Item item={bankInfo} showOnly={showOnly} />
        </div>
      </div>
    </>
  );
};
