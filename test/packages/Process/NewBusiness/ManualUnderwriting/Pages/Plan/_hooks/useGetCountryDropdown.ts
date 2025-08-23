import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { tenant, Region } from '@/components/Tenant';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export default () => {
  const TMP_Dropdown_CFG_Country = getDrowDownList('TMP_Dropdown_CFG_Country');
  const nationalityList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.nationalityList,
    shallowEqual
  );

  return useMemo(() => {
    return tenant.region({
      [Region.TH]: TMP_Dropdown_CFG_Country || [],
      notMatch: nationalityList,
    });
  }, [nationalityList, TMP_Dropdown_CFG_Country]);
};
