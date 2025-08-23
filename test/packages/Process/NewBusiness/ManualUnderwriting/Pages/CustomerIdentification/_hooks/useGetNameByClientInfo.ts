import { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import useGetIsCustomerEntity from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetIsCustomerEntity';

export default ({ clientInfo }: any) => {
  return useMemo(() => {
    return useGetIsCustomerEntity(clientInfo)
      ? formUtils.queryValue(clientInfo.companyName)
      : formUtils.queryValue(clientInfo.name);
  }, [clientInfo]);
};
