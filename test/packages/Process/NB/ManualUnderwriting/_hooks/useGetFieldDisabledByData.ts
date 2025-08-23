import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetProductDicts from 'process/NB/ManualUnderwriting/_hooks/useGetProductDicts';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import { Editable } from 'basic/components/Form';

export default ({ config, id, dataBasicField, dataBasicFieldValue, editable }: any) => {
  const dicts = useGetProductDicts({
    id,
  });
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const productCode = formUtils.queryValue(
    lodash
      .chain(businessData)
      .get('policyList[0].coverageList', [])
      .find((item) => item?.id === id)
      .get('coreCode')
      .value()
  );
  const dataDisabled = useMemo(() => {
    const result =
      formUtils.queryValue(
        lodash
          .chain(dicts)
          .find((item) => item.productCode === productCode)
          .get(dataBasicField)
          .value()
      ) === dataBasicFieldValue;
    return result;
  }, [dicts, dataBasicField, dataBasicFieldValue, productCode]);
  return useMemo(() => {
    if (!productCode) {
      return true;
    }
    if (!editable) {
      return true;
    }
    const configEditable = lodash.get(config, 'editable', 'Y');
    if (configEditable === Editable.Conditions) {
      return dataDisabled;
    }
    return configEditable === Editable.No;
  }, [dataDisabled, config, productCode, editable]);
};
