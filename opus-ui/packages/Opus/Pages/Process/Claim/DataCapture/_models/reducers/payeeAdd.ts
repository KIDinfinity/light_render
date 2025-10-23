import { PAYEEINFO } from '@/utils/claimConstant';
import { v4 as uuidv4 } from 'uuid';
import { IsDefault, PaymentType, BankDesc } from 'claim/enum';
import { produce } from 'immer';
import { SourceSystem } from 'process/Enum';

const payeeAdd = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const id = uuidv4();
    const { policyList = [] } = draftState;

    const extraBankDefaultInfo =
      policyList[0]?.sourceSystem === SourceSystem.Lifej
        ? {
            isNewBankAccount: IsDefault.YES,
            bankDesc: BankDesc.KLIP,
          }
        : {};

    const payeeInfoItem = {
      ...PAYEEINFO,
      claimNo: draftState.claimProcessData.claimNo,
      id,
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
          ...extraBankDefaultInfo,
          id: uuidv4(),
        },
      ],
    };
    draftState.claimProcessData.payeeList = [...draftState.claimProcessData.payeeList, id];
    draftState.claimEntities.payeeListMap[id] = payeeInfoItem;
  });
  return { ...nextState };
};

export default payeeAdd;
