import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import useGetWindowDimensions from 'process/NB/ManualUnderwriting/_hooks/useGetWindowDimensions';
import PolicyNoList from './PolicyNoList';

export default () => {
  const dispatch = useDispatch();
  const [linkedPolicyForms, setLinkedPolicyForms] = useState([]);
  const visible = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.addLinkedPolicyModalVisible,
    shallowEqual
  );

  const handleConfirm = () => {
    dispatch({
      type: `${NAMESPACE}/confirmAddLinkedPolicy`,
      payload: {
        linkedPolicyForms,
      },
    });
  };
  const handleClose = () => {
    dispatch({
      type: `${NAMESPACE}/setAddLinkedPolicyModalVisible`,
      payload: {
        visible: false,
      },
    });
  };
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { height, width, pLeft, pTop } = useGetWindowDimensions();

  return (
    <CommonResizeModal
      visible={visible}
      width={0.4 * width}
      height={0.5 * height}
      onCancel={handleClose}
      onReturn={handleClose}
      onConfirm={handleConfirm}
      returnAuth
      confirmAuth={editable}
      // moveTop={pTop}
      // moveLeft={pLeft}
      // contentStyles={{ maxHeight: `${height}px` }}
    >
      <PolicyNoList
        linkedPolicyForms={linkedPolicyForms}
        setLinkedPolicyForms={setLinkedPolicyForms}
      />
    </CommonResizeModal>
  );
};
