import React from 'react';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useHandleCloseTransferPaymentModal from 'process/NB/ManualUnderwriting/_hooks/useHandleCloseTransferPaymentModal';
import useHandlePaymentTransferSaveCallback from 'process/NB/ManualUnderwriting/_hooks/useHandlePaymentTransferSaveCallback';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../activity.config';

export default ({ children }: any) => {
  const editable = false;
  const showPaymentTransferModal = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.showPaymentTransferModal,
    shallowEqual
  );
  const handleClose = useHandleCloseTransferPaymentModal();
  const handleSave = useHandlePaymentTransferSaveCallback();
  return (
    <CommonResizeModal
      confirmAuth={editable}
      visible={showPaymentTransferModal}
      onReturn={handleClose}
      onCancel={handleClose}
      onSave={handleSave}
      returnAuth
      saveAuth
      width={925}
      height={450}
      moveTop={20}
      title={formatMessageApi({
        Label_BIZ_policy: 'transferPayment',
      })}
    >
      <>{children}</>
    </CommonResizeModal>
  );
};
