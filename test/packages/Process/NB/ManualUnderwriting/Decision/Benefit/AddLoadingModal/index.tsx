import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleCancelAddLoadingModalCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleCancelAddLoadingModalCallback';
import useHandleConfirmAddLoadingItemsCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleConfirmAddLoadingItemsCallback';

export default ({ children }: any) => {
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const visible = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addLoadingModalVisible,
    shallowEqual
  );
  const handleCancelLoadingModal = useHandleCancelAddLoadingModalCallback();
  const handleConfirm = useHandleConfirmAddLoadingItemsCallback();
  return (
    <CommonResizeModal
      confirmAuth={editable}
      visible={visible}
      onCancel={handleCancelLoadingModal}
      onReturn={handleCancelLoadingModal}
      onConfirm={handleConfirm}
      returnAuth
      width={820}
      height={500}
    >
      {visible && children}
    </CommonResizeModal>
  );
};
