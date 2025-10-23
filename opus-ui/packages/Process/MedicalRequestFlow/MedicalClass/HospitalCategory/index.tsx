import React from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';
import HospitalCategoryReadOnly from './HospitalCategoryReadOnly';
import HospitalCategorySelect from './HospitalCategorySelect';
import styles from '../index.less';

export default () => {
  const showHospitalCategorySelect = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.showHospitalCategorySelect
  );
  return (
    <div className={styles.hospitalCategory}>
      {showHospitalCategorySelect ? <HospitalCategorySelect /> : <HospitalCategoryReadOnly />}
    </div>
  );
};
