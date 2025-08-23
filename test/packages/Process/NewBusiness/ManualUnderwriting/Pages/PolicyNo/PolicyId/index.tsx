import React  from 'react';
import { useSelector } from 'dva';
import { Icon } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as TriangleIcon } from 'process/assets/triangle.svg';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import styles from './index.less';

const PolicyId = () => {
  const policyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyId
  );

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
