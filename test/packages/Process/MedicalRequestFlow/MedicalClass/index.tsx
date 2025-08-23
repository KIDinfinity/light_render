import React, { useState } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';
import HospitalCategory from './HospitalCategory';
import styles from './index.less';

export default ({ taskDetail }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const buttonValidate = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.buttonValidate
  );
  const handleConfirm = () => {
    setLoading(true);
    dispatch({
      type: `${NAMESPACE}/medicalClassConfirm`,
      payload: {
        taskDetail,
      },
    });
    setLoading(false);
  };
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}> Medical Class</div>
      <div className={styles.cardContent}>
        <HospitalCategory />
        {buttonValidate && (
          <Button className={styles.button} onClick={handleConfirm} loading={loading}>
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
};
