import { useMemo } from 'react';
import useGetDicts from 'process/NB/ManualUnderwriting/_hooks/useGetDicts';
import { tenant, Region } from '@/components/Tenant';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetClientInfoFieldValueByKey from 'process/NB/ManualUnderwriting/_hooks/useGetClientInfoFieldValueByKey';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export default ({ fieldConfig, id, field, config, parentCode }: any) => {
  const regionCode = tenant.region();
  const IDDicts = useGetDicts({
    parentCode,
    parentFieldName: 'Dropdown_IND_Occupation',
    id,
    field,
    syncChangeValue: true,
    effect: 'changeBasicInfoFields',
  })?.filter((item) => item?.typeCode === 'Dropdown_IND_OccupationClass');

  const occupationGroup = useGetClientInfoFieldValueByKey({ id, key: 'occupationGroup' });

  // TODO：这里应该用getDrowDownList方式去获取下拉
  const MYDicts = useSelector(
    ({ dictionaryController }: any) =>
      lodash.get(
        dictionaryController,
        `hierarchyDicts.Dropdown_IND_OccupationGroup.${occupationGroup}`
      ),
    shallowEqual
  );
  const notMatchDicts = getDrowDownList({ config, fieldConfig });

  return useMemo(() => {
    if (regionCode === Region.MY) {
      return MYDicts;
    }
    if (regionCode === Region.ID) {
      return IDDicts;
    }
    return notMatchDicts;
  }, [MYDicts, regionCode, IDDicts]);
};
