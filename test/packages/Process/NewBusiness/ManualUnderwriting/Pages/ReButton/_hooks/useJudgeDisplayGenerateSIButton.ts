import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const callNanoRetrieveProposalToken = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace?.regionalDefaultValue?.callNanoRetrieveProposalToken,
    shallowEqual
  );
  return useMemo(() => {
    return callNanoRetrieveProposalToken === 'Y';
  }, [callNanoRetrieveProposalToken]);
};
