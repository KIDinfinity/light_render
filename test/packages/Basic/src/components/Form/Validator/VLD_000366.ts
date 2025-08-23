import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000366 = (claimPayableListMap: any) => {
  const result = lodash.every(claimPayableListMap, (item) => !item?.registered);
  const noRegistedPolicyNos = lodash
    .chain(claimPayableListMap)
    .reduce(
      (arr, item) =>
        item?.registered
          ? arr
          : lodash.chain(arr).concat(formUtils.queryValue(item.policyNo)).uniq().value(),
      []
    )
    .join(',')
    .value();
  const errorMessage = {
    code: 'VLD_000366',
    content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000383' }, noRegistedPolicyNos),
  };
  return result ? errorMessage : '';
};
