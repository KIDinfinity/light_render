import React from 'react';

import { useGetBankInfo } from '../../_hooks';

import Basic from './Basic';
import BankItem from './BankItem';
import CardItem from './CardItem';
import styles from '../../index.less';

interface IParams {
  showOnly: boolean;
  planInfoData: any;
  bankInfoList: any;
  bankCardInfoList: any;
}

export default ({ showOnly, planInfoData = {} }: IParams) => {
  const { renewalPayType, policyPayMode = '', bankInfoList, bankCardInfoList } = planInfoData;
  const hasBankPayTypes = ['D', 'H'];
  const hasCardPayTypes = ['R', 'V'];

  const bankInfo = useGetBankInfo({ type: 'R', bankInfoList });
  const cardInfo = bankCardInfoList?.[0] || {};

  const data = {
    ...(hasBankPayTypes.includes(renewalPayType) ? bankInfo : cardInfo),
    renewalPayType,
    policyPayMode,
  };

  return (
    <>
      <div className={styles.paymentItemWrap}>
        <div className={styles.content}>
          {hasBankPayTypes.concat(hasCardPayTypes).includes(renewalPayType) ? (
            <>
              {hasBankPayTypes.includes(renewalPayType) && (
                <BankItem showOnly={showOnly} item={data} renewalPayType={renewalPayType} />
              )}
              {hasCardPayTypes.includes(renewalPayType) && (
                <CardItem showOnly={showOnly} item={data} />
              )}
            </>
          ) : (
            <Basic showOnly={showOnly} item={planInfoData} />
          )}
        </div>
      </div>
    </>
  );
};
