import React from 'react';

import { tenant, Region } from '@/components/Tenant';

import PayType from 'process/NewBusiness/ManualUnderwriting/_enum/PayType';

import { useGetBankInfo } from '../../_hooks';

import Item from './Item';
import Basic from './Basic';

import styles from '../../index.less';

interface IParams {
  showOnly?: boolean;
  planInfoData: any;
  bankInfoList: any;
}

export default ({ showOnly, planInfoData = {} }: IParams) => {
  const { refundPayType = '', bankInfoList = [] } = planInfoData;

  const bankInfo = useGetBankInfo({ type: 'W', bankInfoList });

  return (
    <>
      <div className={styles.paymentItemWrap}>
        <div className={styles.content}>
          {refundPayType === PayType.BankTransfer && tenant.region() !== Region.TH ? (
            <div className={styles.content}>
              <Item item={bankInfo} refundPayType={refundPayType} showOnly={showOnly} />
            </div>
          ) : (
            <Basic showOnly={showOnly} refundPayType={refundPayType} />
          )}
        </div>
      </div>
    </>
  );
};
