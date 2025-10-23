import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';

export default ({ clientId }: any) => {
  const clientList = useGetClientDetailList();
  return useMemo(() => {
    return lodash
      .chain(clientList)
      .find((item: any) => item.id === clientId)
      .get('enquiryId')
      .value();
  }, [clientList, clientId]);
};
