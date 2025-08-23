import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useHandleCancelAddLoadingModalCallback from './_hooks/useHandleCancelAddLoadingModalCallback';
import AddLoadingForm from './AddLoadingForm';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default () => {
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const dispatch = useDispatch();
  const visible = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addLoadingModalVisible,
    shallowEqual
  );
  const handleCancelLoadingModal = useHandleCancelAddLoadingModalCallback();
  const forms =
    useSelector(({ formCommonController }: any) => {
      const formList = [];
      const _forms = formCommonController?.forms ?? {};
      Object.keys(_forms).forEach((key) => {
        if (key.includes('addLoading')) {
          formList.push(_forms[key]);
        }
      });
      return formList;
    }, shallowEqual) || [];
  const handleConfirm = async () => {
    // 数据校验
    const errors = await formUtils.validateFormsAndGetErrors({
      forms: lodash.values(forms),
      force: true,
    });
    if (errors?.length > 0) {
      console.error('errors', errors);
      return;
    }
    // 存数据
    dispatch({
      type: `${NAMESPACE}/confirmAddLoadingItems`,
    });
    dispatch({
      type: `${NAMESPACE}/setAddLoadingModalVisible`,
      payload: {
        addLoadingModalVisible: false,
      },
    });
    // 提交数据
    dispatch({
      type: `${NAMESPACE}/supplyUwDecisionEditInd`,
    });
  };

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
      {visible && <AddLoadingForm />}
    </CommonResizeModal>
  );
};
