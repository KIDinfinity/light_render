import { useCallback } from 'react';
import useHandleSetLinkProductFieldValue from 'decision/components/Benefit/_hooks/useHandleSetLinkProductFieldValue';

export default ({ id, coreCode }: any) => {
  const handleSetLinkProductFieldValue = useHandleSetLinkProductFieldValue({
    coreCode,
    conditionFieldKey: 'saFollowCode',
    conditionFieldValue: 'Y',
  });
  return useCallback(
    (sumAssured) => {
      handleSetLinkProductFieldValue({ targetField: 'sumAssured', value: sumAssured });
    },
    [id, coreCode, handleSetLinkProductFieldValue]
  );
};
