import React from 'react';

import { useGetPolicyPaymentBankInfo } from 'packages/Opus/NewBusiness/ManualUnderwriting/Pages/Payment/_hooks/index';
import { Collapse } from 'antd';
import Item from './Item';
import BankInfoType from 'opus/NewBusiness/Enum/BankInfoType';
import styles from './index.less';
const { Panel } = Collapse;

interface IParams {
  showOnly: boolean;
  planInfoData: any;
  bankInfoList?: any;
}

export default ({ showOnly, planInfoData = {} }: IParams) => {
  const payTypeKey = 'annuityPayType';
  const payType = planInfoData[payTypeKey] || '';

  const bankType = BankInfoType.AnnuityPay;
  const bankInfo = useGetPolicyPaymentBankInfo({
    bankInfoList: planInfoData.bankInfoList,
    bankType,
  });

  return (
    <div className={styles.paymentItemWrap}>
      <div className={styles.content}>
        <Collapse expandIconPosition="right" bordered={false} defaultActiveKey={'AnnuityPayment'}>
          <Panel header="Annuity Payment" key="AnnuityPayment">
            <div className={styles.info}>
              <Item
                item={bankInfo}
                annuityPayType={payType}
                showOnly={showOnly}
                bankType={bankType}
              />
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
