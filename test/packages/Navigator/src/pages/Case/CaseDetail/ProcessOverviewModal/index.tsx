import React from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'dva';
import styles from './index.less';

const ProcessModal = ({ children }) => {
  const { visible } = useSelector((state) => ({
    visible: state?.workspaceCases?.processOverviewModalVisible,
  }));
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        width="80vw"
        visible={visible}
        className={styles.processOverviewModal}
        onCancel={() => {
          dispatch({
            type: 'workspaceCases/setVisiable',
            payload: {
              processOverviewModalVisible: false,
            },
          });
        }}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
};

export default ProcessModal;
