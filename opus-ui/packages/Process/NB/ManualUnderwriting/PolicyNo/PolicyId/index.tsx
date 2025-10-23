import React, { useMemo } from 'react';
import lodash from 'lodash';
import { Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as TriangleIcon } from 'process/assets/triangle.svg';
import styles from './index.less';

const PolicyId = ({ policy }: any) => {
  const policyId = useMemo(() => {
    return lodash.get(policy, 'policyId');
  }, [policy]);
  return (
    <div className={styles.container}>
      <Icon component={TriangleIcon} className={styles.icon}/>
      <span className={styles.title}>{formatMessageApi({ Label_COM_General: 'PolicyNo' })}</span>
      <span className={styles.info}>{policyId}</span>
    </div>
  );
};

PolicyId.displayName = 'PolicyId';

export default PolicyId;
