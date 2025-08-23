import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

export default ({ config, form, fieldConfig }: any) => {
  const regionCode = tenant.region();
  const fieldProps: any = fieldConfig?.['field-props'];
  const fullDicts = getDrowDownList({config, fieldProps});
  const occupationCode = form.getFieldValue('occupationCode');
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
  }, [hierachyOccupationGroupDicts, fullDicts, regionCode]);
};
