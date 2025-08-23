import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const TMP_Dropdown_CFG_Country = getDrowDownList('TMP_Dropdown_CFG_Country');
  const nationalityList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.nationalityList,
    shallowEqual
  );
  return tenant.region({
    [Region.TH]: TMP_Dropdown_CFG_Country || [],
    notMatch: nationalityList,
  });
};
