import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000369 = (claimPayableListMap: any) => {
  const registeredPayableListMap = lodash.filter(claimPayableListMap, (item) => item?.registered);
  const result = lodash.inRange(
    lodash.size(registeredPayableListMap),
    1,
    lodash.size(claimPayableListMap)
  );
  const noRegistedPolicyNos = lodash
    .chain(claimPayableListMap)
    .reduce((arr, item) => {
      // 判断相同的policyNo下的productCode是否一样
      const productCode = lodash
        .chain(claimPayableListMap)
        .filter(
          (value) => formUtils.queryValue(value.policyNo) === formUtils.queryValue(item.policyNo)
        )
        .map((value) => formUtils.queryValue(value.productCode))
        .uniq()
        .value();
      const newArr = lodash.chain(arr).concat(formUtils.queryValue(item.policyNo)).uniq().value();
      return lodash.size(formUtils.queryValue(productCode)) > 1 ? newArr : arr;
    }, [])
    .join(',')
    .value();
  const errorMessage = {
    code: 'VLD_000369',
    content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000386' }, noRegistedPolicyNos),
  };
  return result ? errorMessage : '';
};
