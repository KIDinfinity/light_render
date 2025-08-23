import React from 'react';
import lodash from 'lodash';
import { Card } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import PosCard from '../../pages/360/pages/PosHistory/PolicyList/card';
import Info from '../../pages/360/pages/PosHistory/PolicyList/info';
import List from '../../pages/360/pages/PosHistory/PolicyList/list';

import styles from './index.less';

export default ({ posHistoryList }: any) => {
  const historyGroupList = lodash
    .chain(posHistoryList)
    .groupBy('policyId')
    .map((item, key) => {
      const policyInfo = { policyId: key, mainProductCode: lodash.first(item)?.mainProductCode };
      return {
        policyInfo,
        policyList: item,
        policyId: key,
      };
    })
    .value();
  return (
    <Card
      headStyle={{ color: '#fff' }}
      title={formatMessageApi({ Label_BIZ_Policy: 'Pos' })}
      className={styles.claimHistory}
      bordered={false}
    >
      {lodash.map(historyGroupList, (item, key) => (
        <PosCard key={`${item?.policyId}-${key}`}>
          <Info policyInfo={item.policyInfo} />
          <List policyList={item.policyList} />
        </PosCard>
      ))}
    </Card>
  );
};
