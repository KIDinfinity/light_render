import React from 'react';
import { shallowEqual } from 'react-redux';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import ModalWarnMessage, { EModalWarnMessageType } from 'opus/Components/ModalWarnMessage';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from 'packages/Opus/Pages/Process/Claim/BatchCaseCreation/activity.config';

const ErrorModal = () => {
  const dispatch = useDispatch();

  const { visible, message } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      visible: modelnamespace?.errorModal?.visible,
      message: modelnamespace?.batchCreateCaseSubmit?.message,
    }),
    shallowEqual
  );

  const onOk = () => {
    dispatch({
      type: `${NAMESPACE}/errorModalVisible`,
    });
    dispatch({
      type: `${NAMESPACE}/initUploadDocumentsModalUploadFiles`,
    });
    dispatch({
      type: `${NAMESPACE}/uploadDocumentsVisible`,
    });
  };

  return (
    <ModalWarnMessage
      visible={visible}
      closable={false}
      maskClosable={false}
      onOk={onOk}
      modalDetailText={
        <ul style={{ textAlign: 'left' }}>
          {formatMessageApi({
            Label_COM_ErrorMessage: message?.code || 'MSG_001206',
          })}
        </ul>
      }
      okText={formatMessageApi({
        Label_BPM_Button: 'Close',
      })}
      hideCancelButton={true}
      type={EModalWarnMessageType.error}
    />
  );
};

export default ErrorModal;
