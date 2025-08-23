import React from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';
import styles from '../index.less';

export default () => {
  const hospitalCategory = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.businessData?.hospitalCategory
  );
  return (
    <>
      <div className={styles.lable}>Hospital Category</div>
      <div className={styles.value}>{hospitalCategory}</div>
    </>
  );
};
