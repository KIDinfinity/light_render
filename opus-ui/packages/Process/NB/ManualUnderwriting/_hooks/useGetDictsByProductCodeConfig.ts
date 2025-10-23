import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetProductCodeConfig from 'process/NB/ManualUnderwriting/_hooks/useGetProductCodeConfig';

export default ({ id }: any) => {
  const takeOverList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.businessData?.takeOverList
    ) || [];

  const item = useMemo(() => {
    return formUtils.formatFlattenValue(
      formUtils.cleanValidateData(lodash.find(takeOverList, (dataItem: any) => dataItem.id === id))
    );
  }, [id, takeOverList]);
  const productCodeConfig = useGetProductCodeConfig({
    policyNo: item?.policyNo,
  });
  return useMemo(() => {
    return lodash.map(productCodeConfig, (item: any) => {
      return {
        dictCode: item?.productCode,
        dictName: item?.productName,
      };
    });
  }, [productCodeConfig]);
};
