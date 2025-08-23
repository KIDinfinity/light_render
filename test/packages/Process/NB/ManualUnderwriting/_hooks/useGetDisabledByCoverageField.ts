import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetProductDicts from 'process/NB/ManualUnderwriting/_hooks/useGetProductDicts';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({ id, dataBasicField, dataBasicFieldValue }: any) => {
  const dicts = useGetProductDicts({
    id,
  });
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const dataDisabled = useMemo(() => {
    const productCode = formUtils.queryValue(
      lodash
        .chain(businessData)
        .get('policyList[0].coverageList', [])
        .find((item) => item?.id === id)
        .get('coreCode')
        .value()
    );
    const result =
      formUtils.queryValue(
        lodash
          .chain(dicts)
          .find((item) => item.productCode === productCode)
          .get(dataBasicField)
          .value()
      ) === dataBasicFieldValue;
    return result;
  }, [businessData, dicts, dataBasicField, dataBasicFieldValue, id]);
  return dataDisabled;
};
