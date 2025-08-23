import lodash from 'lodash';
import { ProductType } from 'claim/enum/ProductType';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000365 = (claimPayableListMap: any, policyList: any) => {
  const errorMessage = {
    code: 'VLD_000364',
    content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000392' }),
  };
  const result = lodash.every(claimPayableListMap, (item) =>
    lodash
      .chain(policyList)
      .filter((flip) => flip?.policyNo === formUtils.queryValue(item?.policyNo))
      .some((some) => some.productType === ProductType.Death)
      .value()
  );
  return result ? '' : errorMessage;
};
