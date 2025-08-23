import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';

import { SwitchEnum } from 'claim/pages/utils/claim';
import { isPremiumAccount } from 'claim/enum/isPremiumAccount';


import { getTelNo } from '../_function';

export default (state: any, { payload }: any = {}) => {
  const { id, defaultPayee, countryCode, errors } = payload;
  const payeeIndex: number = lodash.findIndex(state.paymentModal.datas.payeeList, { id }) || 0;
  const payeeItem = state.paymentModal.datas.payeeList[payeeIndex] || {};

  const nextState = produce(state, (draftState: any) => {
    if (errors) {
      draftState.paymentModal.datas.payeeList[payeeIndex].isDefaultPaymentMethod = {
        ...draftState.paymentModal.datas.payeeList[payeeIndex].isDefaultPaymentMethod,
        errors: errors,
      };
      return;
    }

    const payeeBankAccountList = lodash.get(
      draftState,
      `claimData.payeeList.${payeeIndex}.payeeBankAccountList`
    );
    const payeeContactList = lodash.get(
      draftState,
      `claimData.payeeList.${payeeIndex}.payeeContactList`
    );

    draftState.paymentModal.datas.payeeList = lodash.map(
      draftState.paymentModal.datas.payeeList,
      (payee: any) => {
        if (payee.id === id) {
          return {
            ...payeeItem,
            ...defaultPayee,
            payeeBankAccountList:
              lodash.isArray(payeeBankAccountList) &&
              lodash.size(payeeBankAccountList) > 0 &&
              lodash.some(payeeBankAccountList, 'isSelect')
                ? lodash.map(payeeBankAccountList, (bankAccount: any) => {
                    if (bankAccount.isSelect) {
                      let bankAccountTemp = { ...bankAccount };
                      const mergedata = lodash.pick(defaultPayee, [
                        'bankCode',
                        'bankName',
                        'branchCode',
                        'branchName',
                        'accountHolder',
                        'bankAccountNo',
                      ]);
                      bankAccountTemp = { ...bankAccountTemp, ...mergedata };
                      if (defaultPayee.bankCode) {
                        bankAccountTemp.bankCodeCache = defaultPayee.bankCode;
                      }
                      return bankAccountTemp;
                    }
                    return bankAccount;
                  })
                : [
                    {
                      isPremiumAccount: isPremiumAccount.Yes,
                      manualAdd: SwitchEnum.NO,
                      id: uuid(),
                      ...lodash.pick(defaultPayee, [
                        'bankCode',
                        'bankName',
                        'branchCode',
                        'branchName',
                        'accountHolder',
                        'bankAccountNo',
                      ]),
                      isSelect: true,
                    },
                  ],
            payeeContactList: lodash.map(payeeContactList, (payeeContact: any) => {
              if (payeeContact.isDefault === 'Y') {
                const contactTemp = { ...payeeContact };
                contactTemp.telNo = getTelNo({
                  value: defaultPayee.phoneNo || '',
                  contactType: defaultPayee.contactType,
                  paymentMethod: defaultPayee.paymentMethod,
                  countryCode,
                });
                contactTemp.contactType = defaultPayee.contactType;
                contactTemp.email = defaultPayee.email;
                return contactTemp;
              }
              return payeeContact;
            }),
          };
        }
        return payee;
      }
    );
  });

  return { ...nextState };
};
