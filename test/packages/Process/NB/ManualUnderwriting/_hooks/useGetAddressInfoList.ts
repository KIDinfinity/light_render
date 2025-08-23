import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';

export default ({ id }: any) => {
  const clientDetailList = useGetClientDetailList();
  const result = useMemo(() => {
    const addressInfo = lodash
      .chain(clientDetailList)
      .find((item: any) => item?.id === id)
      .get('addressList', [])
      .filter((address: any) => address?.deleted !== 1)
      .filter((address: any) => address?.addrType !== 'US')
      .value();
    return addressInfo;
  }, [clientDetailList]);
  return result;
};
