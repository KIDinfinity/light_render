import { useMemo } from 'react';
import useGetContactInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetContactInfoList';
import lodash from 'lodash';

export default ({ clientId, contactId }: any) => {
  const data = useGetContactInfoList({ id: clientId });
  return useMemo(() => {
    return lodash.find(data, (item: any) => item.id === contactId);
  }, [contactId, data]);
};
