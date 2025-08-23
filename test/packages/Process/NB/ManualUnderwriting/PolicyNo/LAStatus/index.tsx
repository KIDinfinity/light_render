import React, { useMemo } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const LAStatus = ({ policy }: any) => {
  const laPolicyStatus = useMemo(() => {
    return lodash.get(policy, 'laPolicyStatus') || '-';
  }, [policy]);
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {formatMessageApi({
          Label_BIZ_Policy: 'LAStatus',
        })}
      </div>
      <div className={styles.value}>{formatMessageApi({Dropdown_POL_PolicyStatusCode: laPolicyStatus})}</div>
    </div>
  );
};

LAStatus.displayName = 'LAStatus';
export default LAStatus;
