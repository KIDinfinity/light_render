import { produce }  from 'immer';
import lodash from 'lodash';

import { EPaymentMethod } from 'basic/enum';
import { formUtils } from 'basic/components/Form';

import { getBeneficiaryName } from '../functions/getStrVal';
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

    let payeeTemp = {
      ...draftState.claimEntities.payeeListMap[payeeId],
      ...defaultPayee,
    };

    if (lodash.has(defaultPayee, 'paymentMethod')) {
      if (
        defaultPayee.paymentMethod === EPaymentMethod.DirectCredit ||
        defaultPayee.paymentMethod === EPaymentMethod.BankTransfer
      ) {
        payeeTemp = {
          ...payeeTemp,
          accountHolder: getBeneficiaryName(
            formUtils.queryValue(payeeTemp.surname),
            formUtils.queryValue(payeeTemp.firstName)
          ),
        };
      }

      if (defaultPayee.paymentMethod !== EPaymentMethod.DirectCredit) {
        payeeTemp = {
          ...payeeTemp,
          bankCode: '',
          accountHolder: '',
          bankAccountNo: '',
          branchCode: '',
        };
      }
    }

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

    payeeTemp.payeeBankAccountList = lodash.map(payeeTemp?.payeeBankAccountList, (item) => {
      if (item.isDefault === 'Y') {
        return {
          ...item,
          ...lodash.pick(defaultPayee, [
            'bankCode',
            'bankName',
            'branchCode',
            'branchName',
            'accountHolder',
            'bankAccountNo',
          ]),
        };
      }
      return item;
    });
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
