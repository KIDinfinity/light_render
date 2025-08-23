/*
 * @Author: origin.mai@fwd.com origin.mai@fwd.com
 * @Date: 2024-04-12 11:16:20
 * @LastEditors: origin.mai@fwd.com origin.mai@fwd.com
 * @LastEditTime: 2024-04-23 12:06:16
 * @FilePath: /Venus-UI/packages/Process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetFieldDisabledByData.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useMemo } from 'react';
import lodash from 'lodash';
import useGetProductDicts from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetProductDicts';
import { formUtils } from 'basic/components/Form';
import { Editable } from 'basic/components/Form';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';

export default ({ editable, config, id, dataBasicField, dataBasicFieldValue, returnOfPremium }: any) => {
  const dicts = useGetProductDicts({
    id,
  });
  const coverageList = useGetCoverageList('edit');
  const productCode = formUtils.queryValue(
    lodash
      .chain(coverageList)
      .find((item) => item?.id === id)
      .get('coreCode')
      .value()
  );


  const dataDisabled = useMemo(() => {
    if (returnOfPremium === 'PSA' && lodash.find(dicts, { productCode })?.ropInd === 'Y') {
      return false;
    };
    const result =
      formUtils.queryValue(
        lodash
          .chain(dicts)
          .find((item) => item.productCode === productCode)
          .get(dataBasicField)
          .value()
      ) === dataBasicFieldValue;
    return result;
  }, [ dicts, dataBasicField, dataBasicFieldValue, productCode, returnOfPremium]);

  return useMemo(() => {
    if (!editable) {
      return true;
    }
    const configEditable = lodash.get(config, 'editable', 'Y');
    if (configEditable === Editable.Conditions) {
      return dataDisabled;
    }
    return configEditable === Editable.No;
  }, [dataDisabled, config, editable]);
};
