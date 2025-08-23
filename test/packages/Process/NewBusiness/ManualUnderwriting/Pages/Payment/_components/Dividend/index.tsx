import React from 'react';

import { useGetBankInfo } from '../../_hooks';
import PayType from 'process/NewBusiness/ManualUnderwriting/_enum/PayType';

import Basic from './Basic';
import Item from './Item';

import styles from '../../index.less';

interface IParams {
  showOnly: boolean;
  planInfoData: any;
  bankInfoList: any;
}

// TODO：这个还没有调
export default ({ showOnly, planInfoData = {} }: IParams) => {
  const { icpDividendPayType = '' } = planInfoData;

  const bankInfo = useGetBankInfo({ type: 'ID', bankInfoList: planInfoData.bankInfoList });

  return (
    <div className={styles.paymentItemWrap}>
      <div className={styles.content}>
        {icpDividendPayType === PayType.BankTransfer ? (
          <Item item={bankInfo} icpDividendPayType={icpDividendPayType} showOnly={showOnly} />
        ) : (
          <Basic icpDividendPayType={icpDividendPayType} />
        )}
      </div>
    </div>
  );
};
