import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleCancelAddDPRemarkModalCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleCancelAddDPRemarkModalCallback';
import useHandleConfirmAddDPRemarkItemsCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleConfirmAddDPRemarkItemsCallback';

export default ({ children }: any) => {
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const visible = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addDPRemarkModalVisible,
    shallowEqual
  );
  const handleCancelDPRemarkModal = useHandleCancelAddDPRemarkModalCallback();
  const handleConfirm = useHandleConfirmAddDPRemarkItemsCallback();

  return (
    <CommonResizeModal
      confirmAuth={editable}
      visible={visible}
      onCancel={handleCancelDPRemarkModal}
      onReturn={handleCancelDPRemarkModal}
      onConfirm={handleConfirm}
      returnAuth
      width={820}
      height={500}
    >
      {visible && children}
    </CommonResizeModal>
  );
};
