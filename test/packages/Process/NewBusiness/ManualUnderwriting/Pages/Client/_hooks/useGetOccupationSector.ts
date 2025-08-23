import { useMemo } from 'react';
import useGetDicts from './useGetDicts';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

export default ({ config, fieldConfig, id, field, parentField, readOnly }: any) => {
  const IDDicts = useGetDicts({
    parentFieldName: 'Dropdown_IND_NatureofBusiness',
    parentField,
    id,
    field,
    fieldName: 'Dropdown_IND_OccupationSector',
    syncChangeValue: true,
    effect: 'saveBackgroundInfo',
    readOnly,
  });
  const fieldProps: any = fieldConfig['field-props'];
  const notMatchDicts = getDrowDownList({ config, fieldProps });

  return useMemo(() => {
    return tenant.region({
      [Region.ID]: IDDicts,
      notMatch: () => notMatchDicts,
    });
  }, [notMatchDicts, IDDicts]);
};
