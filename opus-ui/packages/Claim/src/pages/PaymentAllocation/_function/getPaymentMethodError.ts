import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default ({ changedFields, payeeItem }: any) => {
  const paymentMethod = formUtils.queryValue(payeeItem?.paymentMethod);
  let errorMessage = {};
  if (
    ((lodash.has(changedFields, 'identityType') && changedFields?.identityType?.value !== 'I') ||
      (lodash.has(changedFields, 'identityNo') &&
        lodash.isEmpty(changedFields?.identityNo?.value))) &&
    paymentMethod === '03'
  ) {
    const MSG_000538 = {
      field: 'paymentMethod',
      message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000538' }),
    };
    if (lodash.isPlainObject(payeeItem?.paymentMethod)) {
      errorMessage = {
        ...payeeItem?.paymentMethod,
        errors: lodash.isArray(payeeItem?.paymentMethod?.errors)
          ? payeeItem.paymentMethod.errors.push(MSG_000538)
          : [MSG_000538],
      };
    } else {
      errorMessage = { value: payeeItem?.paymentMethod, errors: [MSG_000538] };
    }
  }
  return !lodash.isEmpty(errorMessage) ? errorMessage : {};
};
