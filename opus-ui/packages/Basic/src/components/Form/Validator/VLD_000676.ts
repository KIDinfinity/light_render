import lodash from 'lodash';
import { EPaymentMethod } from 'basic/enum';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const handler = (rules: any, callback: Function) => {
  lodash.some(
    rules?.target,
    (rule: any) =>
      lodash.size(
        `${formUtils.queryValue(rule?.firstName)}${formUtils.queryValue(rule?.lastName)}`
      ) > rules?.maxLength
  )
    ? callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000616' }))
    : callback();
};

export const VLD_000676 = ({
  insuredFirstName,
  insuredLastName,
  payeeFirstName,
  payeeLastName,
}: any) => (rule: any, value: any, callback: Function) => {
  const target = [{ firstName: payeeFirstName, lastName: payeeLastName }];
  const allTarget = [
    { firstName: payeeFirstName, lastName: payeeLastName },
    { firstName: insuredFirstName, lastName: insuredLastName },
  ];

  const rules = {
    [EPaymentMethod.FasterPayment]: {
      maxLength: 50,
      target: allTarget,
    },
    [EPaymentMethod.DirectCredit]: {
      maxLength: 140,
      target,
    },
    [EPaymentMethod.SystemCheque]: {
      maxLength: 70,
      target,
    },
    [EPaymentMethod.InstantCheque]: {
      maxLength: 70,
      target,
    },
  }?.[value];

  if (lodash.isNil(rules)) {
    return callback();
  }

  handler(rules, callback);
};
