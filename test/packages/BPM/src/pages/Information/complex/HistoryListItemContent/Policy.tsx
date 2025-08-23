import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const Policy = ({ policyValueList }: any) => {
  return (
    <div className={styles.policy}>
      <div className={styles.label}>
        {formatMessageApi({
          Label_BIZ_Claim: 'venus_claim.label.policyNo',
        })}
        :
      </div>
      <div className={styles.content}>{lodash.join(policyValueList, ', ')}</div>
    </div>
  );
};

export default Policy;
