import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

import useGetDicts from './useGetDicts';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({ fieldConfig, id, field, config, parentField, readOnly, isSecondary }: any) => {
  const regionCode = tenant.region();
  const occupationGroupKey = isSecondary ? 'occupationGroupSecondary' : 'occupationGroup';
  const occupationKey = isSecondary ? 'occupationSecondary' : 'occupationCode';
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
      modelnamepsace?.modalData?.entities?.clientMap?.[id]?.backgroundInfo?.[occupationGroupKey],
    shallowEqual
  );
  const occupationGroupReadOnly = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.clientMap?.[id]?.backgroundInfo?.[occupationGroupKey],
    shallowEqual
  );
  const occupationGroup = readOnly
    ? occupationGroupReadOnly
    : formUtils.queryValue(occupationGroupFieldData);
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
  const occupationCodeFieldData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.modalData?.entities?.clientMap?.[id]?.backgroundInfo?.[occupationKey],
    shallowEqual
  );
  const occupationCodeReadOnly = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.clientMap?.[id]?.backgroundInfo?.[occupationKey],
    shallowEqual
  );
  const occupationCode = readOnly
    ? occupationCodeReadOnly
    : formUtils.queryValue(occupationCodeFieldData);

  const hierarchyOccupation = useSelector(
    ({ dictionaryController }: any) =>
      lodash.get(
        dictionaryController,
        `hierarchyDicts.Dropdown_IND_Occupation.${occupationCode}`,
        []
      ),
    shallowEqual
  );

  const hierarchyOccupationClassDictsTH = hierarchyOccupation.filter(
    (item: any) => item?.typeCode === 'Dropdown_IND_OccupationClass'
  );

  return useMemo(() => {
    if (regionCode === Region.MY) {
      return MYDicts;
    }
    if (regionCode === Region.ID) {
      return IDDicts;
    }
    if (regionCode === Region.TH) {
      return hierarchyOccupationClassDictsTH;
    }
    return notMatchDicts;
  }, [regionCode, notMatchDicts, MYDicts, IDDicts, hierarchyOccupationClassDictsTH]);
};
