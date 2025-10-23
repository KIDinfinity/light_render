import React from 'react';

import { useGetICPPaymentBankInfo } from 'packages/Opus/NewBusiness/ManualUnderwriting/Pages/Payment/_hooks/index';
import PayType from 'opus/NewBusiness/ManualUnderwriting/_enum/PayType';
import { Collapse } from 'antd';
import Basic from './Basic';
import Item from './Item';
import useGetPolicyPaymentBankType from 'opus/NewBusiness/ManualUnderwriting/Pages/Payment/_hooks/useGetPolicyPaymentBankType';

import styles from './index.less';
const { Panel } = Collapse;

interface IParams {
  showOnly: boolean;
  planInfoData: any;
  bankInfoList?: any;
}

// TODO：这个还没有调
export default ({ showOnly, planInfoData = {} }: IParams) => {
  const { icpDividendPayType = '', icpPayType, dividendPayType } = planInfoData;
  const bankType = useGetPolicyPaymentBankType();

  const bankInfo = useGetICPPaymentBankInfo({
    bankInfoList: planInfoData.bankInfoList,
    bankType,
  });

  const payType = icpPayType || dividendPayType || icpDividendPayType;
  return (
    <div className={styles.paymentItemWrap}>
      <div className={styles.content}>
        <Collapse expandIconPosition="right" bordered={false} defaultActiveKey={'ICPPayment'}>
          <Panel header="Dividend and ICP Payment" key="ICPPayment">
            <div className={styles.info}>
              {payType === PayType.BankTransfer ? (
                <Item
                  item={bankInfo}
                  icpDividendPayType={payType}
                  showOnly={showOnly}
                  bankType={bankType}
                />
              ) : (
                <Basic icpDividendPayType={payType} showOnly={showOnly} />
              )}
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
