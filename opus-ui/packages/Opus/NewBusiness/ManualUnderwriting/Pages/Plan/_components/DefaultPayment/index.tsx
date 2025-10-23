import React from 'react';

import { useGetDefaultPaymentBankInfo } from 'packages/Opus/NewBusiness/ManualUnderwriting/Pages/Payment/_hooks/index';
import PayType from 'opus/NewBusiness/ManualUnderwriting/_enum/PayType';
import { Collapse } from 'antd';
import Basic from './Basic';
import Item from './Item';
import styles from './index.less';

const { Panel } = Collapse;

interface IParams {
  showOnly: boolean;
  planInfoData: any;
  bankInfoList?: any;
}

// TODO：这个还没有调
export default ({ showOnly, planInfoData = {} }: IParams) => {
  const { defaultPayType = '' } = planInfoData;

  const bankInfo = useGetDefaultPaymentBankInfo({
    bankInfoList: planInfoData.bankInfoList,
  });
  const bankType = bankInfo?.type;

  const payType = defaultPayType;

  return (
    <div className={styles.paymentItemWrap}>
      <div className={styles.content}>
        <Collapse expandIconPosition="right" bordered={false} defaultActiveKey={'DefaultPayment'}>
          <Panel header="Default Payment" key="DefaultPayment">
            <div className={styles.info}>
              {payType === PayType.BankTransfer ? (
                <Item
                  item={bankInfo}
                  defaultPayType={payType}
                  showOnly={showOnly}
                  bankType={bankType}
                />
              ) : (
                <Basic defaultPayType={payType} showOnly={showOnly} />
              )}
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
