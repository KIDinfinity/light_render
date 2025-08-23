import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleConfirmUpdatePolicyCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleConfirmUpdatePolicyCallback';
import useIngoreUpdatePolicyChangeCallback from 'process/NB/ManualUnderwriting/_hooks/useIngoreUpdatePolicyChangeCallback';
import Client from './Client';

export default () => {
  const visible = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.updatePolicyModalVisible,
    shallowEqual
  );

  const handelCancle = useIngoreUpdatePolicyChangeCallback();

  const onConfirm = useHandleConfirmUpdatePolicyCallback();
  return (
    <CommonResizeModal
      confirmAuth={true}
      visible={visible}
      width={1500}
      height={700}
      returnAuth
      onReturn={handelCancle}
      onCancel={handelCancle}
      onConfirm={onConfirm}
    >
      <Client />
    </CommonResizeModal>
  );
};
