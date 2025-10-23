import { useDispatch, useSelector } from 'dva';
import moment from 'moment';
import { ModalTabs } from 'opus/Enums';
import { NAMESPACE } from 'opus/Pages/Home/activity.config';
import React, { useEffect, useState } from 'react';
import Header from '../../../Components/LeaveOverview/Header';
import UpComingLeave from '../../../Components/LeaveOverview/UpComingLeave';
import styles from './index.less';

const TaskUpComingLeave = ({ selectedDate }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getLeaveOver`,
      payload: {
        leaveDate: selectedDate,
        type: ModalTabs.myTask,
      },
    });
  }, [selectedDate]);

  const taskLeaveOver = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskLeaveOver
  );

  return <UpComingLeave dataSource={taskLeaveOver} />;
};

export default () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('MM-DD-YYYY'));

  return (
    <div className={styles.card}>
      <Header />
      <TaskUpComingLeave selectedDate={selectedDate} />
    </div>
  );
};
