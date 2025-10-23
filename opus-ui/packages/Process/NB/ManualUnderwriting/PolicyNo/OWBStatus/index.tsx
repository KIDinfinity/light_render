import React, { useMemo } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const OWBStatus = ({ policy }: any) => {
  const policyStatus = useMemo(() => {
    return lodash.get(policy, 'policyStatus') || '-';
  }, [policy]);
  return (
    <div className={styles.container}>
      <div className={styles.con}>
        <div>
          {formatMessageApi({
            Label_BIZ_Policy: 'OWBStatus',
          })}
        </div>
        <div className={styles.owbstatus}>{formatMessageApi({Dropdown_POL_PolicyStatusCode:policyStatus})}</div>
      </div>
    </div>
  );
};

OWBStatus.displayName = 'OWBStatus';

export default OWBStatus;
