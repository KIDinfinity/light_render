import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetClientInfoFieldValueByKey from 'process/NB/ManualUnderwriting/_hooks/useGetClientInfoFieldValueByKey';
import { tenant, Region } from '@/components/Tenant';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export default ({ config, id }: any) => {
  const regionCode = tenant.region();
  const fullDicts = getDrowDownList({ config });
  const occupationCode = useGetClientInfoFieldValueByKey({ id, key: 'occupationCode' });
  const hierachyOccupationGroupDicts = useSelector(
    ({ dictionaryController }: any) =>
      lodash.get(dictionaryController, `hierarchyDicts.Dropdown_IND_Occupation.${occupationCode}`),
    shallowEqual
  );

  return useMemo(() => {
    if (regionCode === Region.MY) {
      return hierachyOccupationGroupDicts;
    }
    return fullDicts;
  }, [hierachyOccupationGroupDicts, regionCode]);
};
