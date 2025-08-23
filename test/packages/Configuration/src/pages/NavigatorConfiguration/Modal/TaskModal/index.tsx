import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Modal as AntModal } from 'antd';
import type { Dispatch } from 'redux';
import TaskDetailAuth from '@/auth/Layout/AuthTaskLayout';
import styles from './index.less';


function TaskModal(props: any) {
  const dispatch: Dispatch = useDispatch();
  const showModal: boolean = useSelector((state: any) => state.configurationController.showModal);
  const modalTaskId: any = useSelector((state: any) => state.configurationController.modalTaskId);
  const { TableSearch } = props;
  const onCancel = () => {
    dispatch({
      type: 'configurationController/hideModal',
    });
    dispatch({
      type: 'configurationController/refreshResult',
    });
    dispatch({
      type: 'configurationController/resetModalTask',
    });
    dispatch({
      type: 'configurationController/resetPreviewRecord',
    });
    // eslint-disable-next-line no-unused-expressions
    TableSearch?.setSelectedRows?.([]);
  };

  return (
    <>
      <AntModal
        className={styles.taskModal}
        visible={!!showModal && !!modalTaskId}
        width={1200}
        footer={false}
        onCancel={onCancel}
        maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
      >
        {modalTaskId && (
          //@ts-ignore
          <TaskDetailAuth match={{ params: { taskId: modalTaskId } }} />
        )}
      </AntModal>
    </>
  );

}
export default TaskModal;
