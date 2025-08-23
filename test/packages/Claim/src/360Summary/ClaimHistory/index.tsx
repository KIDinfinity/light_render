import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Card } from 'antd';

import ClaimHistoryItem from '../../pages/360/pages/ClaimHistory/ClaimHistoryItem';

import styles from './index.less';

export default ({ claimHistoryList }: any) => {
  return (
    (lodash.size(claimHistoryList) > 0 && (
      <Card
        headStyle={{ color: '#fff' }}
        title={formatMessageApi({ Label_BIZ_Policy: 'Claim' })}
        className={styles.claimHistory}
        bordered={false}
      >
        {lodash
          .chain(claimHistoryList)
          .orderBy('submissionDate', 'desc')
          .map((item: any, key) => <ClaimHistoryItem claimHistoryItem={item} key={key} />)
          .value()}
      </Card>
    )) ||
    null
  );
};
