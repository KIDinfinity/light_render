import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleAddTransferPaymentItem from 'process/NB/ManualUnderwriting/_hooks/useHandleAddTransferPaymentItem';
import useCallPremiumEnquiry from 'process/NB/ManualUnderwriting/_hooks/useCallPremiumEnquiry';

export default () => {
  const dispatch = useDispatch();
  // TODO:这里为什么要调用这个？
  const handleAddItem = useHandleAddTransferPaymentItem();
  const handleRefreshData = useCallPremiumEnquiry();
  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/setPaymentTransferModalDisplay`,
      payload: {
        showPaymentTransferModal: true,
      },
    });
    handleRefreshData();
  }, [handleAddItem, handleRefreshData]);
};
