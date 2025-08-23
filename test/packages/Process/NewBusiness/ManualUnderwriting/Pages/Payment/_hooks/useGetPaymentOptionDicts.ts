import { useMemo, useEffect } from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';

export default ({ fieldConfig, config, parentCode, parentFieldName }: any) => {
  const dispatch = useDispatch();
  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.linkDicts[`${parentFieldName}-${parentCode}`],
    shallowEqual
  );
  const fieldProps: any = fieldConfig['field-props'];
  const notMatchDicts = getDrowDownList({ config, fieldProps });

  useEffect(() => {
    tenant.region({
      [Region.MY]: async () => {
        await dispatch({
          type: `${NAMESPACE}/getLinkDicts`,
          payload: { parentCode, parentFieldName },
        });
      },
      notMatch: null,
    });
  }, [parentCode, parentFieldName]);

  return useMemo(() => {
    const IDDicts =
      dicts?.filter(
        ({ typeCode, dictCode }: any) =>
          typeCode === 'Dropdown_POL_PaymentOption' && lodash.find(notMatchDicts, { dictCode })
      ) ?? [];
    return tenant.region({
      [Region.MY]: IDDicts,
      notMatch: () => notMatchDicts,
    });
  }, [notMatchDicts, dicts]);
};
