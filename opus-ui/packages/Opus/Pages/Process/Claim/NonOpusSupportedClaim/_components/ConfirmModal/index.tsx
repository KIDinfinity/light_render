import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
import Confirm from 'opus/Components/Modals/Confirm';
import { useDispatch, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const ConfirmModal = () => {
  const dispatch = useDispatch();

  const showConfirmModal =
    useSelector(({ [NAMESPACE]: state }: any) => {
      return state?.showConfirmModal;
    }) || null;

  const confirmModalResolve =
    useSelector(({ [NAMESPACE]: state }: any) => {
      return state?.confirmModalResolve;
    }) || null;

  const confirmModalReject =
    useSelector(({ [NAMESPACE]: state }: any) => {
      return state?.confirmModalReject;
    }) || null;
  const errorMessage =
    useSelector(({ [NAMESPACE]: state }: any) => {
      return state?.errorMessage;
    }) || null;

  const cancelConfirmModal = async () => {
    await dispatch({
      type: `${NAMESPACE}/setConfirmModalShow`,
      payload: {
        cancel: true,
      },
    });
  };

  const handleConfirm = () => {
    confirmModalResolve(true);
    cancelConfirmModal();
  };

  const handleCancle = () => {
    confirmModalResolve(false);
    cancelConfirmModal();
  };

  return (
    <Confirm show={showConfirmModal} handleCancle={handleCancle} handleConfirm={handleConfirm}>
      <div>
        {errorMessage} {formatMessageApi({ MSG_COM_WRN: 'STWRN_000001' })}
      </div>
    </Confirm>
  );
};

export default ConfirmModal;
