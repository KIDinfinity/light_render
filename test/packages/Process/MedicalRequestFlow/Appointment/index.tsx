import React, { useState } from 'react';
import moment from 'moment';
import lodash from 'lodash';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import useGetApointmentDateListByStatus from 'process/MedicalRequestFlow/_hooks/useGetApointmentDateListByStatus';
import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';
import AppointmentDatePicker from './AppointmentDatePicker';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const rejectApointmentDateList = useGetApointmentDateListByStatus({ isReject: true });
  const noRejectApointmentDateList = useGetApointmentDateListByStatus({ isReject: false });
  const buttonValidate = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.buttonValidate
  );
  const handleReject = () => {
    setShowLoading(true);
    dispatch({
      type: `${NAMESPACE}/appointmentDateReject`,
    });
    setShowLoading(false);
  };
  const handleConfirm = async () => {
    setLoading(true);
    await dispatch({
      type: `${NAMESPACE}/appointmentDateConfirm`,
    });
    setLoading(false);
  };
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTitle}>Appointment</div>
        <div className={styles.cardContent}>
          <AppointmentDatePicker />
          {!lodash.isEmpty(noRejectApointmentDateList) && buttonValidate && (
            <div className={styles.button}>
              <Button onClick={handleConfirm} loading={loading}>
                Confirm
              </Button>
              <Button onClick={handleReject} loading={showLoading}>
                Reject
              </Button>
            </div>
          )}
        </div>
      </div>
      {!lodash.isEmpty(rejectApointmentDateList) && (
        <div className={styles.rejectedDateContent}>
          <div className={styles.dateTitle}>Rejected Appointment Date</div>
          {lodash.map(rejectApointmentDateList, (item) =>
            item?.appointmentDate ? (
              <div className={styles.rejectedDate}>
                {moment(item?.appointmentDate).format('YYYY/MM/DD HH:mm')}
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      )}
    </>
  );
};
