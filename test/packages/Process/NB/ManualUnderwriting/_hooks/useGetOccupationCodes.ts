import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetClientInfoFieldValueByKey from 'process/NB/ManualUnderwriting/_hooks/useGetClientInfoFieldValueByKey';
import useGetDicts from 'process/NB/ManualUnderwriting/_hooks/useGetDicts';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetOccupation from 'process/NB/ManualUnderwriting/_hooks/useGetOccupation';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ id, config, fieldConfig, field, parentCode }: any) => {
  const regionCode = tenant.region();
  const IDDicts = useGetDicts({
    parentCode,
    parentFieldName: 'Dropdown_IND_NatureofBusiness',
  })?.filter((item) => item?.typeCode === 'Dropdown_IND_Occupation');
  const occupationGroup = useGetClientInfoFieldValueByKey({ id, key: 'occupationGroup' });

  const fieldProps: any = fieldConfig?.['field-props'];
  const fullDicts = getDrowDownList({ config, fieldProps });
  const occupationFullList = useSelector(
    (state: any) => state[NAMESPACE].occupationFullList,
    shallowEqual
  );
  const MYDicts = useGetOccupation({
    fieldConfig,
    id,
    field,
    config,
  });

  const hierachyOccupationGroupDicts = useSelector(
    ({ dictionaryController }: any) =>
      lodash.get(
        dictionaryController,
        `hierarchyDicts.Dropdown_IND_OccupationGroup.${occupationGroup}`
      ),
    shallowEqual
  );
  return useMemo(() => {
    if (regionCode === Region.ID) {
      return IDDicts;
    }
    if (regionCode === Region.PH || !occupationGroup) {
      return fullDicts;
    }
    if (regionCode === Region.VN) {
      return occupationFullList?.Dropdown_IND_Occupation;
    }
    if (regionCode === Region.MY) {
      return MYDicts;
    }
    return hierachyOccupationGroupDicts;
  }, [
    hierachyOccupationGroupDicts,
    IDDicts,
    MYDicts,
    occupationGroup,
    regionCode,
    occupationFullList,
    fullDicts,
  ]);
};
