import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useHandleCancelAddDPRemarkModalCallback from './_hooks/useHandleCancelAddDPRemarkModalCallback';
import AddDPRemarkForm from './AddDPRemarkForm';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default () => {
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const visible = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addDPRemarkModalVisible,
    shallowEqual
  );
  const forms =
    useSelector(({ formCommonController }: any) => {
      const formList = [];
      const _forms = formCommonController?.forms ?? {};
      Object.keys(_forms).forEach((key) => {
        if (key.includes('addDPRemark')) {
          formList.push(_forms[key]);
        }
      });
      return formList;
    }, shallowEqual) || [];
  const dispatch = useDispatch();
  const handleCancelDPRemarkModal = useHandleCancelAddDPRemarkModalCallback();
  const handleConfirm = async () => {
    const errors = await formUtils.validateFormsAndGetErrors({
      forms: lodash.values(forms),
      force: true,
    });
    if (errors?.length > 0) {
      return;
    }

    dispatch({
      type: `${NAMESPACE}/confirmAddDPRemarkItems`,
    });
    dispatch({
      type: `${NAMESPACE}/setAddDPRemarkModalVisible`,
      payload: {
        addDPRemarkModalVisible: false,
      },
    });
  };

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
      {visible && <AddDPRemarkForm />}
    </CommonResizeModal>
  );
};
