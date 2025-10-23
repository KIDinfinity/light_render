import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import { useCallback } from 'react';
import type { RadioChangeEvent } from 'plugins/ant-design/lib/radio/interface';

export default ({ bankList }: any) => {
  const dispatch = useDispatch();

  return useCallback(
    (e: RadioChangeEvent) => {
      const value = e.target.value;
      dispatch({
        type: `${NAMESPACE}/saveFormData`,
        target: 'handleSelectBankInfo',
        payload: {
          id: value,
          // auditLog
          changedFields: {
            type: {
              value,
              name: 'type',
              label: `BankInfoSector ${bankList[value]?.index + 1}`,
            },
          },
        },
      });
    },
    [bankList]
  );
};
