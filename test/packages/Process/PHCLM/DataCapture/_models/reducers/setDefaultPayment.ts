import { produce }  from 'immer';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';


import getTelNo from '../functions/getTelNo';

const setDefaultPayment = (state: any, { payload }: any) => {
  const { payeeId, defaultPayee, countryCode, errors } = payload;

  return produce(state, (draftState: any) => {
    if (errors) {
      draftState.claimEntities.payeeListMap[payeeId].isDefaultPaymentMethod = {
        ...draftState.claimEntities.payeeListMap[payeeId].isDefaultPaymentMethod,
        errors: errors
      }
      return;
    }

    const payeeTemp = {
      ...draftState.claimEntities.payeeListMap[payeeId],
      ...defaultPayee,
    };



    if (lodash.has(defaultPayee, 'phoneNo')) {
      payeeTemp.phoneNo = getTelNo({
        value: defaultPayee.phoneNo,
        contactType:
          defaultPayee.contactType ||
          formUtils.queryValue(payeeTemp.contactType) ||
          formUtils.queryValue(payeeTemp.payeeContactList[0]?.contactType),
        paymentMethod: defaultPayee.paymentMethod || formUtils.queryValue(payeeTemp.paymentMethod),
        countryCode,
      });
    }

    payeeTemp.payeeContactList = lodash.map(payeeTemp.payeeContactList, (item) => {
      if (item.isDefault === 'Y') {
        item.telNo = payeeTemp.phoneNo;
        item.contactType = payeeTemp.contactType;
        item.email = payeeTemp.email;
      }
      return item;
    });
    draftState.claimEntities.payeeListMap[payeeId] = payeeTemp;
  });
};

export default setDefaultPayment;
