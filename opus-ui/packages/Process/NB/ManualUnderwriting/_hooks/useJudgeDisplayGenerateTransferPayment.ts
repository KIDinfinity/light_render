import { useMemo } from 'react';
import useGetRegionalDefaultValue from 'process/NB/ManualUnderwriting/_hooks/useGetRegionalDefaultValue';

export default () => {
  const displayTransferPayment = useGetRegionalDefaultValue({
    codeType: 'supportTransferPayment',
  });

  return useMemo(() => {
    return displayTransferPayment === 'Y';
  }, [displayTransferPayment]);
};
