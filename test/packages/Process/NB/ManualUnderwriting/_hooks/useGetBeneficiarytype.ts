import { useMemo } from 'react';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { formUtils } from 'basic/components/Form';

export default ({ config, fieldConfig }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const list = useGetClientDetailList();

  return useMemo(() => {
    const isTBbeneficiarytypeInClients = lodash.some(list, (item: any) => {
      return formUtils.queryValue(item.beneficiaryType) === 'TB';
    });
    const TBbeneficiaryIndex = lodash.findIndex(list, (item: any) => {
      return formUtils.queryValue(item.beneficiaryType) === 'TB';
    });
    const result =
      isTBbeneficiarytypeInClients && TBbeneficiaryIndex !== 0
        ? lodash.filter(dicts, (item: any) => {
            return item.dictCode !== 'TB';
          })
        : dicts;
    return result;
  }, [dicts, list]);
};
