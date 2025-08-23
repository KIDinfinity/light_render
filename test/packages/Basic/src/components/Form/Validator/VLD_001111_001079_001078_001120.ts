import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_001111_001079_001078_001120 =
  ({ listPolicy, policyNo: sourcePolicyNo, beneficiaryAmount, payoutCurrency }: any) =>
  (rule: any, value: any, callback: Function) => {
    const errors = [];
    const sumAssured =
      lodash
        .chain(listPolicy)
        .find(
          ({ policyNo, coverageKey }: any) =>
            sourcePolicyNo === policyNo && coverageKey === '010100'
        )
        .get('sumAssured')
        .value() || null;
    if (!!sumAssured && Number(value) > Number(sumAssured) * 0.2) {
      errors.push(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001257' }));
    }
    if (Number(value) > Number(beneficiaryAmount)) {
      errors.push(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001194' }));
    }
    if (payoutCurrency === 'USD' && Number(value) > 5000) {
      errors.push(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001266' }));
    } else if (Number(value) > 250000) {
      errors.push(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001193' }));
    }

    if (!lodash.isEmpty(errors)) {
      callback(errors);
    }
    callback();
  };
