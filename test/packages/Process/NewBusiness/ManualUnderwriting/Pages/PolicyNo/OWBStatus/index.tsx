import React from 'react';
import { useSelector } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import styles from './index.less';

const OWBStatus = () => {
  const policyStatus = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyStatus
  ) || '-';

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
