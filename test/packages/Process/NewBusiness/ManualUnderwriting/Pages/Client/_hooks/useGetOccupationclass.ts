import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

import useGetDicts from './useGetDicts';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({ fieldConfig, id, field, config, parentField, readOnly }: any) => {
  const regionCode = tenant.region();
  const IDDicts = useGetDicts({
    parentFieldName: 'Dropdown_IND_Occupation',
    parentField,
    id,
    field,
    fieldName: 'Dropdown_IND_OccupationClass',
    syncChangeValue: true,
    effect: 'saveBackgroundInfo',
    readOnly,
  });

  const occupationGroupFieldData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.modalData?.entities?.clientMap?.[id]?.backgroundInfo?.occupationGroup,
    shallowEqual
  );
  const occupationGroupReadOnly = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.clientMap?.[id]?.backgroundInfo?.occupationGroup,
    shallowEqual
  );
  const occupationGroup = readOnly ? occupationGroupReadOnly : formUtils.queryValue(occupationGroupFieldData);
  // TODO：这里应该用getDrowDownList方式去获取下拉
  const MYDicts = useSelector(
    ({ dictionaryController }: any) =>
      lodash.get(
        dictionaryController,
        `hierarchyDicts.Dropdown_IND_OccupationGroup.${formUtils.queryValue(occupationGroup)}`
      ),
    shallowEqual
  );
  const fieldProps: any = fieldConfig?.['field-props'];
  const notMatchDicts = getDrowDownList({ config, fieldProps });

  return useMemo(() => {
    if (regionCode === Region.MY) {
      return MYDicts;
    }
    if (regionCode === Region.ID) {
      return IDDicts;
    }
    return notMatchDicts;
  }, [notMatchDicts, MYDicts, regionCode, IDDicts]);
};
