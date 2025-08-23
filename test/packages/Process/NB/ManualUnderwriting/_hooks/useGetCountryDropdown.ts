import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { tenant, Region } from '@/components/Tenant';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export default () => {
  const TMP_Dropdown_CFG_Country = getDrowDownList('TMP_Dropdown_CFG_Country');
  const nationality = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.nationality,
    shallowEqual
  );


  return useMemo(() => {
    return tenant.region({
      [Region.TH]: TMP_Dropdown_CFG_Country || [],
      notMatch: nationality,
    });
  }, [nationality, TMP_Dropdown_CFG_Country]);
};
