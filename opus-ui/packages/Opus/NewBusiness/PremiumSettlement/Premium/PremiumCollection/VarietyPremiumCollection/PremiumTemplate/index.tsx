import React from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/PremiumSettlement/activity.config';
import styles from './index.less';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const PremiumTemplate = ({ title, receivableAmount, receivedAmount }: any) => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.businessData,
    shallowEqual
  );
  const currencyCode = lodash.get(businessData, 'policyList[0].currencyCode', []);

  return (
    <div className={styles.wrap}>
      <Collapse expandIconPosition="right" bordered={false} defaultActiveKey={title}>
        <Panel header={title} key={title}>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.title}>Receivable Amount</span>
              <span className={styles.con}>
                {receivableAmount} {currencyCode}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.title}>Received Amount</span>
              <span className={styles.con}>
                {receivedAmount} {currencyCode}
              </span>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default PremiumTemplate;
