import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import Beneficiarytype from 'process/NB/ManualUnderwriting/Enum/Beneficiarytype';
import CustomerRole from 'process/NB/Enum/CustomerRole';

export const VLD_000716 = ({ list, id, beneficiaryType }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (beneficiaryType !== Beneficiarytype.TB) {
    const shareSum = lodash
      .chain(list)
      .reduce((sum, item) => {
        if (
          formUtils.queryValue(item.beneficiaryType) === beneficiaryType &&
          formUtils.queryValue(item.customerRole).includes(CustomerRole.Beneficiary)
        ) {
          return (sum = add(id === item.id ? value : formUtils.queryValue(item?.share) || 0, sum));
        } else {
          return sum;
        }
      }, 0)
      .value();
    shareSum !== 100 && callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000670' }));
  }
  callback();
};
