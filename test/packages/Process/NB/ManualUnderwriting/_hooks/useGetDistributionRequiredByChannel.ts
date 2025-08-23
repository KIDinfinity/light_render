import { useMemo } from 'react';
import lodash from 'lodash';
import useGetDistributionChannel from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionChannel';
import { formUtils } from 'basic/components/Form';

export default ({ id }: any) => {
  const data = useGetDistributionChannel();
  return useMemo(() => {
    const formItem = lodash
      .chain(data)
      .find((item) => item?.id === id)
      .get('agentChannelCode')
      .value();
    const value = formUtils.queryValue(formItem);
    return lodash.includes(['BC', 'BCA', 'BANCA', 'AF', 'Affinity'], value);
  }, [id, data]);
};
