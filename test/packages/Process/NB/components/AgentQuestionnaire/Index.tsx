import React from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'dva';
import useLoadQuestionnaire from './hooks/useLoadQuestionnaire';
import Questionnaire from 'basic/components/QuestionnaireV2/Questionnaire';
import styles from './index.less';
import NamespaceProvider from 'basic/components/NamespaceProvider';

import { NAMESPACE } from './activity.config';

export default ({ agentData }) => {
  const dispatch = useDispatch();
  const visible = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.visible);
  const { businessNo } = useSelector(({ processTask }: any) => processTask.getTask || {});

  const handleClose = () => {
    dispatch({
      type: `${NAMESPACE}/saveVisible`,
      payload: { visible: false },
    });
  };
  useLoadQuestionnaire({
    businessNo,
    agentData,
  });
  return (
    <Modal
      width="1000px"
      visible={visible}
      maskClosable={false}
      keyboard={false}
      style={{ top: '50px' }}
      onCancel={handleClose}
      onOk={() => {}}
      footer={null}
      className={styles.modal}
      closeIcon={null}
    >
      <NamespaceProvider namespace={NAMESPACE}>
        <Questionnaire />
      </NamespaceProvider>
    </Modal>
  );
};
