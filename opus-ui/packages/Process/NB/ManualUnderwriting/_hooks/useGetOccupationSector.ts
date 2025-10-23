import { useMemo } from 'react';
import useGetDicts from 'process/NB/ManualUnderwriting/_hooks/useGetDicts';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

export default ({ fieldConfig, config, parentCode }: any) => {
  const IDDicts = useGetDicts({
    parentCode,
    parentFieldName: 'Dropdown_IND_NatureofBusiness',
  })?.filter((item) => item?.typeCode === 'Dropdown_IND_OccupationSector');
  const fieldProps: any = fieldConfig['field-props'];
  const notMatchDicts = getDrowDownList({ config, fieldProps });

  return useMemo(() => {
    return tenant.region({
      [Region.ID]: IDDicts,
      notMatch: () => notMatchDicts,
    });
  }, [notMatchDicts, IDDicts]);
};
