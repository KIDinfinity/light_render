import { produce } from 'immer';
import lodash from 'lodash';
import { getPayeeDicts } from '../functions/paymentAllocation';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { PAYEEINFO } from '@/utils/claimConstant';
import { v4 as uuidv4 } from 'uuid';
import { IsDefault, PaymentType } from 'claim/enum';
import { PaymentMethod } from 'claim/pages/Enum';
import { formUtils } from 'basic/components/Form';

const getInitPayable = ({ id, claimNo, ...rest }: any) => {
  return {
    ...PAYEEINFO,
    claimNo,
    id,
    ...rest,
    isDefault: IsDefault.YES,
    paymentType: PaymentType.URGE,
    payeeContactList: [{ isDefault: IsDefault.YES, email: '', contactType: '', id: uuidv4() }],
    payeeBankAccountList: [
      {
        isSelect: true,
        isDefault: IsDefault.YES,
        bankCode: '',
        bankName: '',
        accountHolder: '',
        accountHolderKana: '',
        bankAccountNo: '',
        branchCode: '',
        branchName: '',
        passbookNo: '',
        passbookCode: '',
        id: uuidv4(),
      },
    ],
  };
};

const savePayeeInfo = (state: any, { payload }: any = {}) => {
  const { changedFields, id } = payload;

  const payeeIndex: number = lodash.findIndex(state.paymentModal.datas.payeeList, { id }) || 0;

  const nextState = produce(state, (draftState: any) => {
    const payeeItem = draftState.paymentModal.datas.payeeList[payeeIndex] || {};
    draftState.paymentModal.datas.payeeList[payeeIndex] = {
      ...payeeItem,
      ...changedFields,
    };

    if (lodash.size(changedFields) === 1) {
      const clientId = payeeItem?.clientId || '';
      if (lodash.has(changedFields, 'payeeType')) {
        const payeeType = formUtils.queryValue(changedFields.payeeType);
        const {
          policyInsuredList = [],
          policyOwnerList = [],
          clientInfoList = [],
        } = draftState.paymentModal.datas.c360PolicyInfo || {};

        draftState.paymentModal.datas.payeeList[payeeIndex] = getInitPayable({
          id,
          claimNo: draftState.claimProcessData.claimNo,
          clientId,
          payeeType,
        });

        if (
          lodash.includes(
            [relationshipWithInsuredForHK.policyOwner, relationshipWithInsuredForHK.self],
            payeeType
          )
        ) {
          const configs: any = {
            [relationshipWithInsuredForHK.policyOwner]: policyOwnerList,
            [relationshipWithInsuredForHK.self]: policyInsuredList,
          };

          if (!!lodash.find(configs?.[payeeType], { clientId })) {
            const clientInfo = lodash.find(clientInfoList, { clientId });
            draftState.paymentModal.datas.payeeList[payeeIndex] = {
              ...draftState.paymentModal.datas.payeeList[payeeIndex],
              ...(clientInfo || {}),
            };
            if (
              clientInfo.surname &&
              draftState.paymentModal.datas.payeeList[payeeIndex].payeeBankAccountList[0]
            )
              draftState.paymentModal.datas.payeeList[
                payeeIndex
              ].payeeBankAccountList[0].accountHolder = clientInfo.surname;
          }
        }
      }
      if (lodash.has(changedFields, 'firstName') || lodash.has(changedFields, 'surname')) {
        // eslint-disable-next-line no-param-reassign
        draftState.paymentModal.payeeDicts = [
          ...getPayeeDicts(draftState.paymentModal.datas.payeeList),
        ];
      }

      if (lodash.has(changedFields, 'accountType')) {
        const payee = draftState.paymentModal.datas.payeeList[payeeIndex];
        payee.payeeBankAccountList = lodash.map(payee.payeeBankAccountList, (item: any) => ({
          ...item,
          accountType: changedFields.accountType,
        }));
      }

      if (lodash.has(changedFields, 'paymentMethod')) {
        const payee = draftState.paymentModal.datas.payeeList[payeeIndex];
        const payeeType = formUtils.queryValue(payee.payeeType);
        const paymentMethod = formUtils.queryValue(changedFields.paymentMethod);

        payee.payeeBankAccountList = lodash.map(payee.payeeBankAccountList, (item: any) => ({
          ...item,
          // accountHolder: '',
          accountType: '',
          bankCode: '',
          bankName: '',
          branchCode: '',
          branchName: '',
          bankAccountNo: '',

          isPremiumAccount: null,
          isNewBankAccount: '',
          isDefault: 'Y',
          accountHolderKana: '',
          bankAccountId: null,
          bankDesc: '',
          accountHolderClientId: '',
          bankCodeCache: '',
          bankType:
            paymentMethod === PaymentMethod.BankTransfer
              ? 'BANK'
              : paymentMethod === PaymentMethod.PostBank
                ? 'POST'
                : '',
        }));

        if (paymentMethod === PaymentMethod.PremiumAccount) {
          if (payeeType === relationshipWithInsuredForHK.self) {
            payee.payeeBankAccountList = lodash
              .chain(payee.payeeBankAccountList)
              .map((item: any) => ({
                ...item,
                ...(lodash.find(
                  draftState.paymentModal.datas.c360PolicyInfo?.clientBankAccountList || [],
                  ({ policyId }: any) => draftState.claimProcessData.insured?.policyId === policyId
                ) || {}),
                bankType:
                  payeeItem?.payeeBankAccountList?.[0]?.bankCode === '9900' ? 'POST' : 'BANK',
              }))
              .value();
          }
        }
      }
    }

    if (
      lodash.has(changedFields, 'paymentType') &&
      state.paymentModal.datas.payeeList[payeeIndex].payeeBankAccountList[0].accountType.value ===
        '03'
    ) {
      lodash.set(
        draftState,
        [
          'paymentModal',
          'datas',
          'payeeList',
          payeeIndex,
          'payeeBankAccountList',
          0,
          'accountType',
        ],
        null
      );
    }
  });

  return { ...nextState };
};

export default savePayeeInfo;
