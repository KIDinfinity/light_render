import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useFilterAuthorisedSignatoryClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useFilterAuthorisedSignatoryClientDetailList';

export default ({ expendStatus }: any) => {
  const expendedClient = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.expendedClient;
  }, shallowEqual);
  const list = useFilterAuthorisedSignatoryClientDetailList();
  return useMemo(() => {
    return expendStatus || !!(list?.length === 2 && !expendedClient);
  }, [list, expendedClient, expendStatus]);
};
