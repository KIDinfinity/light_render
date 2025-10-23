import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

export default ({ config, form, fieldConfig, isSecondary }: any) => {
  const regionCode = tenant.region();
  const fieldProps: any = fieldConfig?.['field-props'];
  const fullDicts = getDrowDownList({ config, fieldProps });
  const occupationClass = form.getFieldValue(
    isSecondary ? 'occupationClassSecondary' : 'occupationClass'
  );
  const occupationCode = form.getFieldValue(isSecondary ? 'occupationSecondary' : 'occupationCode');
  const hierarchyOccupationGroupDicts = useSelector(
    ({ dictionaryController }: any) =>
      lodash.get(
        dictionaryController,
        `hierarchyDicts.Dropdown_IND_OccupationClass.${occupationClass}`
      ),
    shallowEqual
  );
  const hierarchyOccupation = useSelector(
    ({ dictionaryController }: any) =>
      lodash.get(
        dictionaryController,
        `hierarchyDicts.Dropdown_IND_Occupation.${occupationCode}`,
        []
      ),
    shallowEqual
  );

  const hierarchyOccupationGroupDictsTH = hierarchyOccupation.filter(
    (item: any) => item?.typeCode === 'Dropdown_IND_OccupationGroup'
  );

  return useMemo(() => {
    if (regionCode === Region.MY) {
      return hierarchyOccupationGroupDicts;
    }
    if (regionCode === Region.TH) {
      return hierarchyOccupationGroupDictsTH;
    }
    return fullDicts;
  }, [regionCode, fullDicts, hierarchyOccupationGroupDicts, hierarchyOccupationGroupDictsTH]);
};
