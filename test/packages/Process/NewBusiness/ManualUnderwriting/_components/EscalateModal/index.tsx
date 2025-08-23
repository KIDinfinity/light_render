import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'dva';

import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { Modal, Button } from 'antd';
import styles from './index.less';
import Escalate from './Escalate';
import { ReactComponent as ExclamationCircleOutlinedIcon } from 'bpm/assets/ExclamationCircleOutlined.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
const CLOSE = 'Close';
const Confirmation = 'Confirmation';
const EscalateModal = () => {
  const [escalateForm, setEscalateForm] = useState<any>({});
  const dispatch = useDispatch();
  const showEscalateModal =
    useSelector(({ [NAMESPACE]: state }: any) => {
      return state?.showEscalateModal;
    }) || false;
  useEffect(() => {
    if (showEscalateModal) {
      dispatch({
        type: `${NAMESPACE}/getAssigneeAndTeam`,
      });
    }
  }, [showEscalateModal]);
  const handleCancel = () => {
    dispatch({
      type: `${NAMESPACE}/setEscalateModalShow`,
      payload: {
        cancel: true,
      },
    });
  };

  const handleContinue = async () => {
    escalateForm.validateFields({ force: true }, async (errors: any) => {
      if (lodash.isEmpty(errors)) {
        const res: any = await dispatch({
          type: `${NAMESPACE}/setManualEscalateAssignee`,
        });
        if (res?.success) {
          Modal.success({
            centered: true,
            title: Confirmation,
            content: (
              <div>
                {`This case has been escalated and has been assigned to `}
                <strong>{res?.resultData}</strong>.
              </div>
            ),
            okText: CLOSE,
            onOk: () => window.location.reload(),
          });
        }
      }
    });
  };
  return (
    <>
      <Modal
        visible={showEscalateModal}
        title={
          <div className={styles.title}>
            <ExclamationCircleOutlinedIcon className={styles.exclamationCircleOutlinedIcon} />
            <span>
              {formatMessageApi({
                Label_COM_Opus: 'EscalateCase',
              })}
            </span>
          </div>
        }
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {formatMessageApi({
              Label_BPM_Button: 'Cancel',
            })}
          </Button>,
          <Button key="submit" type="primary" onClick={handleContinue}>
            {formatMessageApi({
              Label_BPM_Button: 'Continue',
            })}
          </Button>,
        ]}
        className={styles.escalateModalFooter}
      >
        <div className={styles.escalate}>
          <Escalate setEscalateForm={setEscalateForm} />
        </div>
      </Modal>
    </>
  );
};

export default EscalateModal;
