import { PAYEEINFO } from '@/utils/claimConstant';
import {v4 as uuidv4 } from 'uuid';
import { IsDefault, PaymentType } from 'claim/enum';
import { produce }  from 'immer';

const payeeAdd = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const id = uuidv4();
    const payeeInfoItem = {
      ...PAYEEINFO,
      claimNo: draftState.claimProcessData.claimNo,
      id,
      isDefault: IsDefault.YES,
      paymentType: PaymentType.LS,
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
    draftState.claimProcessData.payeeList = [...draftState.claimProcessData.payeeList, id];
    draftState.claimEntities.payeeListMap[id] = payeeInfoItem;
  });
  return { ...nextState };
};

export default payeeAdd;
