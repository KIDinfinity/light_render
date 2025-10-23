import React from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'dva';
import useLoadQuestionnaire from './hooks/useLoadQuestionnaire';
import Questionnaire from './Questionnaire';
import styles from './index.less';
import NamespaceProvider from 'basic/components/NamespaceProvider';

import { NAMESPACE } from './activity.config';
interface modal {
  caseNo?: number;
  identityNo?: string;
  identityType?: string;
  caseCategory?: string;
  businessNo?: string;
  isNB?: boolean;
  agentData?: any;
}

export default ({
  identityNo,
  agentData,
  identityType,
  caseNo,
  caseCategory,
  businessNo,
  isNB,
}: modal) => {
  const dispatch = useDispatch();
  const visible = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.visible);

  const handleClose = () => {
    dispatch({
      type: `${NAMESPACE}/saveVisible`,
      payload: { visible: false },
    });
  };
  useLoadQuestionnaire({
    identityNo,
    identityType,
    caseNo,
    caseCategory,
    businessNo,
    isNB,
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
        <Questionnaire
          identityNo={identityNo}
          identityType={identityType}
          caseNo={caseNo}
          caseCategory={caseCategory}
          businessNo={businessNo}
          isNB={isNB}
        />
      </NamespaceProvider>
    </Modal>
  );
};
