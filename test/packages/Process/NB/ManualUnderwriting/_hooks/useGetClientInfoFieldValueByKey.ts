import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { formUtils } from 'basic/components/Form';

export default ({ id, key }: any) => {
  const clientDetailList = useGetClientDetailList();
  return useMemo(() => {
    const field = lodash
      .chain(clientDetailList)
      .find((item: any) => item.id === id)
      .get(key)
      .value();
    return formUtils.queryValue(field);
  }, [clientDetailList, id, key]);
};
