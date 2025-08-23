import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { tenant, Region } from '@/components/Tenant';

import { getDrowDownList } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetDicts from './useGetDicts';
import { formUtils } from 'basic/components/Form';

export default ({ config, fieldConfig, id, field, parentField, readOnly }: any) => {
  const regionCode = tenant.region();
  const IDDicts = useGetDicts({
    parentFieldName: 'Dropdown_IND_NatureofBusiness',
    parentField,
    id,
    field,
    fieldName: 'Dropdown_IND_Occupation',
    syncChangeValue: true,
    effect: 'saveBackgroundInfo',
    readOnly,
  });
  const occupationGroup = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.modalData?.entities?.clientMap?.[id]?.backgroundInfo?.occupationGroup,
    shallowEqual
  );
  const fieldProps: any = fieldConfig?.['field-props'];
  const fullDicts = getDrowDownList({ config, fieldProps });

  const hierachyOccupationGroupDicts = useSelector(
    ({ dictionaryController }: any) =>
      lodash.get(
        dictionaryController,
        `hierarchyDicts.Dropdown_IND_OccupationGroup.${formUtils.queryValue(occupationGroup)}`
      ),
    shallowEqual
  );
  return useMemo(() => {
    if (regionCode === Region.ID) {
      return IDDicts;
    }
    if (
      regionCode === Region.PH ||
      regionCode === Region.VN ||
      regionCode === Region.MY ||
      !occupationGroup
    ) {
      return fullDicts;
    }
    return hierachyOccupationGroupDicts;
  }, [fullDicts, hierachyOccupationGroupDicts, IDDicts, regionCode, occupationGroup]);
};
