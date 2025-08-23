import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleCloseUpdatePolicyModal from 'process/NB/ManualUnderwriting/_hooks/useHandleCloseUpdatePolicyModal';
import bpm from 'bpm/pages/OWBEntrance';
import { supplyUwProposal } from '@/services/owbNbProposalControllerService';
import lodash from 'lodash';
import { Action } from '@/components/AuditLog/Enum';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { formUtils } from 'basic/components/Form';

export default () => {
  const dispatch = useDispatch();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.businessData,
    shallowEqual
  );
  const taskId =  useSelector(
    ({ processTask}: any) => processTask?.getTask?.taskId,
  );
  const handleClose = useHandleCloseUpdatePolicyModal();
  const forms = useSelector(
    ({ formCommonController: modelnamepsace }: any) => modelnamepsace.forms
  );
  return useCallback(async () => {
    const errors = await formUtils.validateFormsAndGetErrors({
      forms: lodash.values(forms),
      force: true,
    });

    if (errors?.length) {
      return requestHandleType.break;
    }
    handleClose();

    const dataForSubmit = await dispatch({
      type: `${NAMESPACE}/getDataForSubmit`,
    });

    const response = await supplyUwProposal(dataForSubmit);
    const { success, resultData: updated } = lodash.pick(response, ['success', 'resultData']);
    if (success) {
      dispatch({
        type: 'auditLogController/logButton',
        payload: {
          action: Action.Save,
        },
      });
      dispatch({
        type: 'saveClaimProcessData',
        payload: {
          taskId,
          claimProcessData: updated,
        },
      });
      dispatch({
        type: `${NAMESPACE}/saveBizData`,
        payload: {
          businessData: updated,
        },
      });
      bpm.buttonAction('save');
    }
  }, [handleClose, taskId, forms]);
};
