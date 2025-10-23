import { useMemo } from 'react';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import CustomerRole from 'enum/CustomerRole';

export default () => {
  const roleDicts: any = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.roleDicts,
    shallowEqual
  );
  return useMemo(() => {
    return lodash.filter(roleDicts, (item: any) =>
      [CustomerRole.Insured, CustomerRole.Payor].includes(item.dictCode)
    );
  }, [roleDicts]);
};
