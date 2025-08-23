import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetProductDicts from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetProductDicts';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default ({ id, dataBasicField, dataBasicFieldValue }: any) => {
  const dicts = useGetProductDicts({
    id,
  });
  const coverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.coverageList,
    shallowEqual
  );
  const dataDisabled = useMemo(() => {
    const productCode = formUtils.queryValue(
      lodash
        .chain(coverageList)
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
  }, [coverageList, dicts, dataBasicField, dataBasicFieldValue, id]);
  return dataDisabled;
};
