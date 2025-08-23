import React from 'react';
import lodash from 'lodash';
import Item from './item';
import Empty from '@/components/Empty';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const Card = ({ children, policyInfo }: any) => {
  return (
    <div className={styles.card}>
      <div className={styles.policy}>
        <div className={styles.policyno}>
          {formatMessageApi({ Label_BIZ_Policy: 'PolicyNo' })}
          <span className={styles.PolicyNoCode}>{policyInfo?.policyId}</span>
        </div>
        <div className={styles.text}>
          ({formatMessageApi({ Label_BIZ_POS: 'baseProduct' })}{' '}
          {formatMessageApi({ Dropdown_PRD_Product: policyInfo?.mainProductCode })})
        </div>
        {children}
      </div>
    </div>
  );
};

export default ({ historyList }: any) => {
  return (
    <div>
      {!lodash.isEmpty(historyList) ? (
        <>
          {lodash.map(historyList, (historyItem, historyKey) => (
            <Card
              key={`${historyItem?.policyId}-${historyKey}`}
              policyInfo={historyItem.policyInfo}
            >
              {lodash.map(historyItem.policyList, (item, key) => (
                <Item key={key} index={key} policyItem={item} />
              ))}
            </Card>
          ))}
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};
