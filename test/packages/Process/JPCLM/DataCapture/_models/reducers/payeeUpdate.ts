import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { PaymentMethod, TransferAccount } from 'claim/pages/Enum';
import { PAYEEITEM } from '@/utils/claimConstant';
import {
  saveDefaultPayee,
  getDefaultPayeeId,
  saveNormalizedPayee,
  omitKeys,
} from 'claim/pages/utils/getPayeeDefaultData';
import links from '../links';

const payeeUpdate = (state: any, action: any) => {
  const { changedFields, auto } = action.payload;
  const isEditStatus = lodash.keys(changedFields).length === 1;
  const payeeListMap = lodash.get(state, 'claimEntities.payeeListMap');
  let payeeId = getDefaultPayeeId(payeeListMap);
  const id = uuidv4();

  const nextState = produce(state, (draftState: any) => {
    if (!payeeId) {
      draftState.claimProcessData.payeeList = [...draftState.claimProcessData.payeeList, id];
      draftState.claimEntities.payeeListMap[id] = {
        ...PAYEEITEM,
        claimNo: draftState.claimProcessData.claimNo,
        id,
      };

      payeeId = id;
    }

    let payeeTemp = {
      // 这步的操作是因为后端会在最外层返回空数据，要去掉
      ...lodash
        .chain(draftState.claimEntities.payeeListMap[payeeId] || {})
        .cloneDeep()
        .omit(omitKeys)
        .value(),
      ...changedFields,
      id: payeeId,
    };

    if (formUtils.queryValue(payeeTemp.bankCode)) {
      payeeTemp.bankCodeCache = formUtils.queryValue(payeeTemp.bankCode);
    }

    if (lodash.size(changedFields) > 1 && !auto) {
      draftState.claimEntities.payeeListMap[payeeId] = saveDefaultPayee(payeeTemp);
      return;
    }

    if (isEditStatus && lodash.has(changedFields, 'payeeType')) {
      links.relateWithInsure_payeeType({ draftState, changedFields, payeeId });
    }

    if (isEditStatus && lodash.has(changedFields, 'paymentMethod')) {
      const paymentMethod = formUtils.queryValue(changedFields.paymentMethod);
      const omitKeys = [
        'bankCode',
        'bankName',
        'accountHolder',
        'accountHolderKana',
        'bankAccountNo',
        'branchCode',
        'branchName',
        'passbookNo',
        'passbookCode',
      ];
      const premAccount = draftState.premBankAccount || {};

      const accountPick: any = lodash.pick(premAccount, omitKeys);
      const { passbookCode, passbookNo } = accountPick;

      if (paymentMethod === PaymentMethod.PostBank) {
        payeeTemp = {
          ...payeeTemp,
          passbookCode,
          passbookNo,
        };
      }

      if (paymentMethod !== PaymentMethod.FasterPayment) {
        payeeTemp = {
          ...payeeTemp,
          contactType: '',
        };
      }
    }

    if (isEditStatus && lodash.has(changedFields, 'bankCode')) {
      payeeTemp = {
        ...payeeTemp,
        branchName: '',
        branchCode: '',
      };
    }

    if (!lodash.has(changedFields, 'payeeType')) {
      const { bankCodeCache, paymentMethod } = payeeTemp;
      const paymentMethodVal = formUtils.queryValue(paymentMethod);
      const bankCodeVal = formUtils.queryValue(bankCodeCache);
      const isPost = paymentMethodVal === PaymentMethod.PostBank;
      const isBank = paymentMethodVal === PaymentMethod.BankTransfer;
      const isPrem = paymentMethodVal === PaymentMethod.PremiumAccount;

      if (lodash.has(changedFields, 'paymentMethod')) {
        if (isPost || isBank) {
          payeeTemp = {
            ...payeeTemp,
            bankCode: '',
            bankName: '',
            branchCode: '',
            branchName: '',
            accountType: '',
            bankAccountNo: '',
            passbookNo: '',
            passbookCode: '',
            bankType: isPost ? 'POST' : 'BANK',
          };
        }

        if (isPrem && bankCodeVal) {
          if (bankCodeVal === '9900') {
            payeeTemp = {
              ...payeeTemp,
              // bankCode: '',
              bankName: '',
              branchCode: '',
              branchName: '',
              accountType: '',
              bankAccountNo: '',
              bankType: 'POST',
            };
          }

          if (bankCodeVal !== '9900') {
            payeeTemp = {
              ...payeeTemp,
              passbookNo: '',
              passbookCode: '',
              bankType: 'BANK',
            };
          }
        }

        payeeTemp = {
          ...payeeTemp,
          transferAccount: isPrem
            ? TransferAccount.TransferAccount
            : TransferAccount.PointingAccount,
        };
      }

      const newPayeeTemp = saveDefaultPayee(payeeTemp, changedFields);

      const result = saveNormalizedPayee(
        draftState.claimEntities.payeeListMap,
        newPayeeTemp,
        payeeId
      );
      draftState.claimProcessData.payeeList = result.payeeList;
      draftState.claimEntities.payeeListMap = result.payeeListMap;
    }
  });

  return { ...nextState };
};

export default payeeUpdate;
