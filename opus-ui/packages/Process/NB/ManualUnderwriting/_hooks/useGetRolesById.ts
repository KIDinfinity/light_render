import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { formUtils } from 'basic/components/Form';

export default ({ id }: any) => {
  const clientDetailList = useGetClientDetailList();
  const result = useMemo(() => {
    return lodash
      .chain(clientDetailList)
      .find((item: any) => item?.id === id)
      .get('roleList', [])
      .map((item: any) => formUtils.queryValue(item.customerRole))
      .value();
  }, [clientDetailList, id]);
  return result;
};
