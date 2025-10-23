import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetClientDetailList.ts';
import useGetClientNameByConfigCallback from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetClientNameByConfigCallback';
import CustomerRole from 'enum/CustomerRole';

export default () => {
  const list = useGetClientDetailList();
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });
  return useMemo(() => {
    return lodash
      .chain(list)
      .filter((item: any) => item?.deleted !== 1)
      .filter((item: any) =>
        lodash.some(item.customerRole, (role: CustomerRole) =>
          [CustomerRole.Insured, CustomerRole.Payor].includes(role)
        )
      )
      .map((clientInfo) => {
        return {
          dictCode: clientInfo?.id,
          dictName: handleGetDefaultClientName({ clientInfo }),
        };
      })
      .value();
  }, [list, handleGetDefaultClientName]);
};
