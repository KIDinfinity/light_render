import { useCallback } from 'react';
import useHandleSetLinkProductFieldValue from 'decision/components/Benefit/_hooks/useHandleSetLinkProductFieldValue';

export default ({ id, coreCode }: any) => {
  const handleSetLinkProductFieldValue = useHandleSetLinkProductFieldValue({
    coreCode,
    conditionFieldKey: 'premiumTermFollowCode',
    conditionFieldValue: 'Y',
  });
  return useCallback(
    (payPeriod) => {
      handleSetLinkProductFieldValue({ targetField: 'payPeriod', value: payPeriod });
    },
    [id, coreCode, handleSetLinkProductFieldValue]
  );
};
