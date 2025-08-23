import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';

export default () => {
  const dispatch = useDispatch();

  return useCallback((e: any) => {
    dispatch({
      type: `${NAMESPACE}/savePremiumPayType`,
      payload: {
        payType: e.target.value,
        // auditLog
        changedFields: {
          refundPayType: {
            value: e.target.value,
            name: 'refundPayType',
            label: 'Payment Method (Premium Refund)',
            typeCode: 'Dropdown_POL_PaymentMethod',
          },
        },
      },
    });
  }, []);
};
