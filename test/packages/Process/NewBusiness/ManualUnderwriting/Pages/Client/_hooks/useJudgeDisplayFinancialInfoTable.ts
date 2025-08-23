import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

export default ({ clientId, readOnly = false }: any) => {
  const clientMapReadOnly = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.entities?.clientMap;
  }, shallowEqual);

  const clientEdit = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.modalData?.entities?.clientMap;
  }, shallowEqual);

  const clientMap = readOnly ? clientMapReadOnly : clientEdit;

  return useMemo(() => {
    const usTaxFlag = formUtils.queryValue(
      lodash
        .chain(clientMap)
        .values()
        .find((item: any) => item?.id === clientId)
        .get('financialInfo.usTaxFlag')
        .value()
    );
    // ID、MY 不看usTaxFlag, 默认显示
    return tenant.region({
      [Region.ID]: true,
      [Region.MY]: true,
      notMatch: usTaxFlag === 'Y',
    });
  }, [clientId, clientMap]);
};
