import { VLD_000991, VLD_000992 } from 'claim/pages/PaymentAllocation/_validators/fieldValidators';
import lodash, { isFunction } from 'lodash';

/**
 *
 * @param claimData
 * @param filter optional validation filter by name
 */

const getRedepositError = (claimData: any, filter?: (Validation: string) => boolean) => {
  const Validations = {
    VLD_000991,
    VLD_000992,
  };
  const payeeList = lodash.get(claimData, 'payeeList');
  const bankAccountError: Record<string, string>[] = [];

  lodash.forEach(payeeList, (payeeItem: any) => {
    Object.entries(Validations).forEach(([key, validate]) => {
      const allowValidate = isFunction(filter) ? filter(key) : true;
      if (allowValidate) {
        const validateError = validate(payeeItem);
        if (validateError) {
          bankAccountError.push(validateError);
        }
      }
    });
  });

  return bankAccountError;
};

export default getRedepositError;
