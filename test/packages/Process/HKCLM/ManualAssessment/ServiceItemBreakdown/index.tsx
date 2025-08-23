import React from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { NAMESPACE } from 'process/HKCLM/ManualAssessment/activity.config';
import BreakdownList from './BreakdownList';

const ServiceItemBreakdown = () => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const isShowServiceItemBreakdown = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isShowServiceItemBreakdown
  );

  const claimServiceItemBreakDownList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimServiceItemBreakDownList
  );

  const serviceItemBreakdownPoint = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.serviceItemBreakdownPoint
  );

  const serviceItemBreakdownForms = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.serviceItemBreakdownForms
  );

  const onClose = async () => {
    await dispatch({
      type: `${NAMESPACE}/serviceItemBreakdownDelete`,
    });
  };

  const onConfirm = async () => {
    const { serviceItemId } = lodash.find(claimServiceItemBreakDownList, 'serviceItemId');

    const errors = await formUtils.validateFormsAndGetErrors({
      forms: lodash.values(serviceItemBreakdownForms),
      force: true,
    });
    if (errors?.length > 0) {
      return;
    }

    await dispatch({
      type: `${NAMESPACE}/saveServiceItemBreakdownList`,
      payload: {
        serviceItemId,
      },
    });
    await dispatch({
      type: `${NAMESPACE}/setBreakdownConfirm`,
      payload: {
        serviceItemId,
      },
    });
    await onClose();
  };

  const top = Number(serviceItemBreakdownPoint?.top) + 32;
  const left = Number(serviceItemBreakdownPoint?.left) - 240;

  return (
    <CommonResizeModal
      confirmAuth={editable}
      returnAuth
      authHeight
      visible={isShowServiceItemBreakdown}
      onReturn={onClose}
      onCancel={onClose}
      onConfirm={onConfirm}
      moveTop={top}
      moveLeft={left}
      width={540}
    >
      {isShowServiceItemBreakdown && <BreakdownList />}
    </CommonResizeModal>
  );
};

export default ServiceItemBreakdown;
