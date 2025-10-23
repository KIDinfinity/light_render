import React from 'react';
import { useSelector, useDispatch } from 'dva';
import TaskDetailAuth from '@/auth/Layout/AuthTaskLayout';
import { Modal as AntdModal } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

interface IProps {
  showModal: boolean;
}

const Modal: React.FC<IProps> = ({ showModal }) => {
  const dispatch = useDispatch();

  const taskId: string = useSelector((state: any) => state.leaveManagement.modalTaskId);

  const { taskStatus }: any = useSelector((state: any) => state.processTask.getTask);
  const completed = taskStatus && taskStatus === 'completed';

  return (
    <AntdModal
      className={classnames(styles.modalWrap, completed && styles.completedWrap)}
      visible={showModal}
      width={800}
      footer={false}
      onCancel={() => {
        dispatch({
          type: 'leaveManagement/saveState',
          payload: {
            showModal: false,
            calendarDate: '',
          },
        });
      }}
      maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
    >
      {taskId && <TaskDetailAuth match={{ params: { taskId } }} />}
    </AntdModal>
  );
};

export default Modal;
