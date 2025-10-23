import { useMemo } from 'react';
import useGetRegionalDefaultValue from 'process/NB/ManualUnderwriting/_hooks/useGetRegionalDefaultValue';

export default () => {
  const callNanoRetrieveProposalToken = useGetRegionalDefaultValue({
    codeType: 'callNanoRetrieveProposalToken',
  });

  return useMemo(() => {
    return callNanoRetrieveProposalToken === 'Y';
  }, [callNanoRetrieveProposalToken]);
};
