import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import * as documentUtils from './documentUtils';
import { CategoryLower, ePaymentMethod, mapingValue } from '../Enum';

const keysMap = {
  [CategoryLower.RequestForm]: {
    paymentMethod: (item: any) => {
      const { paymentMethod, accountNo, depositBookNo } = formUtils.cleanValidateData(item);
      const handle = {
        [ePaymentMethod.post]: () => ({
          postalBank: mapingValue.y,
          premiumTransferAccount: null,
          financialInstitution: documentUtils.isNotEmpty(accountNo) ? mapingValue.y : null,
        }),
        [ePaymentMethod.bank]: () => ({
          postalBank: documentUtils.isNotEmpty(depositBookNo) ? mapingValue.y : null,
          premiumTransferAccount: null,
          financialInstitution: mapingValue.y,
        }),
        [ePaymentMethod.premium]: () => ({
          postalBank: documentUtils.isNotEmpty(depositBookNo) ? mapingValue.y : null,
          premiumTransferAccount: mapingValue.y,
          financialInstitution: documentUtils.isNotEmpty(accountNo) ? mapingValue.y : null,
        }),
      };
      return handle[paymentMethod] && handle[paymentMethod]();
    },
  },
};

export default (formData: any, changedFields: any) => {
  const currentDocument = lodash.toLower(lodash.get(formData, 'formCategory'));
  const changeKeys = lodash.keys(changedFields);

  return lodash.reduce(
    changeKeys,
    (result, key) => {
      const fn = lodash.get(keysMap, `${currentDocument}.${key}`, () => {});
      return {
        ...result,
        ...fn(formData),
      };
    },
    {}
  );
};
