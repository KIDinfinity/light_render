import React, { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Modal } from 'antd';
import { v4 as uuid } from 'uuid';

import Questionnaire from 'basic/components/Questionnaire';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import styles from './index.less';

const QuestionnaireModal = ({ children, visible, handleClose, handleConfirm }: any) => {
  const clientsQuestionnaire = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.clientsQuestionnaire,
    shallowEqual
  );
  const selectedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.selectedClientId,
    shallowEqual
  );
  const sectionHash = useMemo(() => {
    return uuid(selectedClientId);
  }, [selectedClientId, visible]);

  const actionConfig = useMemo(() => {
    return {
      back: {
        action: () => {
          handleClose();
        },
      },
    };
  }, []);

  return (
    <>
      <Modal
        width="1000px"
        visible={visible}
        onCancel={handleClose}
        onOk={handleConfirm}
        footer={null}
        className={styles.modal}
        closeIcon={null}
      >
        <Questionnaire
          questionnaireData={clientsQuestionnaire}
          selectedClientId={selectedClientId}
          sectionHash={sectionHash}
          actionConfig={actionConfig}
        />
      </Modal>
      {children}
    </>
  );
};

export default QuestionnaireModal;
