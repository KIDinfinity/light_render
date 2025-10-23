import { useCallback } from 'react';
import useHandleSetLinkProductFieldValue from 'process/NB/ManualUnderwriting/_hooks/useHandleSetLinkProductFieldValue';

export default ({ id, coreCode }: any) => {
  const handleSetLinkProductFieldValue = useHandleSetLinkProductFieldValue({
    coreCode,
    conditionFieldKey: 'policyTermFollowCode',
    conditionFieldValue: 'Y',
  });
  return useCallback(
    (indemnifyPeriod) => {
      handleSetLinkProductFieldValue({ targetField: 'indemnifyPeriod', value: indemnifyPeriod });
    },
    [id, coreCode, handleSetLinkProductFieldValue]
  );
};
