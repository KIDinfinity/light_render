import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import classnames from 'classnames';
import styles from './index.less';

const PremiumTemplate = ({ title, receivableAmount, receivedAmount }: any) => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.businessData,
    shallowEqual
  );
  const currencyCode = lodash.get(businessData, 'policyList[0].currencyCode', []);

  return (
    <div className={styles.wrap}>
      <div className={styles.paymentType}>
        <div className={styles.tag} />
        <span>{title}</span>
      </div>
      <div className={styles.container}>
        <div className={styles.paymentContent}>
          <div>
            <span className={classnames(styles.paymentAmount, styles.receivableAmount)}>
              {receivableAmount}
            </span>
            <span className={styles.paymentCurrency}>{currencyCode}</span>
          </div>
          <span className={styles.paymentDescription}>Receivable Amount</span>
        </div>
        <div className={styles.paymentContent}>
          <div>
            <span
              className={classnames(styles.paymentAmount, {
                [styles.receivedAmount]:
                  lodash.toNumber(receivedAmount) >= lodash.toNumber(receivableAmount),
                [styles.noReceivedAmount]:
                  lodash.toNumber(receivedAmount) < lodash.toNumber(receivableAmount),
              })}
            >
              {receivedAmount}
            </span>
            <span className={styles.paymentCurrency}>{currencyCode}</span>
          </div>
          <span className={styles.paymentDescription}>Received Amount</span>
        </div>
      </div>
    </div>
  );
};

export default PremiumTemplate;
