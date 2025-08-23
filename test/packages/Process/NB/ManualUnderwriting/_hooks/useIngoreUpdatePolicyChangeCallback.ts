import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleCloseUpdatePolicyModal from 'process/NB/ManualUnderwriting/_hooks/useHandleCloseUpdatePolicyModal';

export default () => {
  const dispatch = useDispatch();
  const updatingPolicyOriginalDraft = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.updatingPolicyOriginalDraft,
    shallowEqual
  );
  const handleClose = useHandleCloseUpdatePolicyModal();
  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/saveBizData`,
      payload: {
        businessData: updatingPolicyOriginalDraft,
      },
    });
    handleClose();
  }, [updatingPolicyOriginalDraft, dispatch, handleClose]);
};
