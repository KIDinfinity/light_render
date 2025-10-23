import React from 'react';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './PolicyItem.less';
import PolicyContainer from './PolicyContainer';

export default ({ item, productCode }: any) => {
  return (
    <div className={styles.policyWrap}>
      <div className={styles.policyTitle}>
        {formatMessageApi({ Dropdown_PRD_Product: item?.[0]?.aliasProductCode || productCode })}
      </div>
      <div>
        {lodash.map(item, (target) => (
          <PolicyContainer key={target} item={target} />
        ))}
      </div>
    </div>
  );
};
