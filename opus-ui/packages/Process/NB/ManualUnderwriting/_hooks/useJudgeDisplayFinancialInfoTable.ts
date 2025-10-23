import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

export default ({ clientId }: any) => {
  const clientInfoList = useGetClientDetailList();
  return useMemo(() => {
    const usTaxFlag = formUtils.queryValue(
      lodash
        .chain(clientInfoList)
        .find((item: any) => item?.id === clientId)
        .get('usTaxFlag')
        .value()
    );
    // ID、MY 不看usTaxFlag, 默认显示
    return tenant.region({
      [Region.ID]: true,
      [Region.MY]: true,
      notMatch: usTaxFlag === 'Y',
    });
  }, [clientId, clientInfoList]);
};
