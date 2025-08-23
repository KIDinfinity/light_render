import { PAYEEINFO } from '@/utils/claimConstant';
import { IsDefault } from 'claim/enum';
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';
import { PaymentMethod } from 'claim/pages/Enum';

const addPayeeInfoItem = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const id = uuidv4();
    const payeeInfoItem = {
      ...PAYEEINFO,
      claimNo: draftState.claimProcessData.claimNo,
      id,
      isDefault: IsDefault.YES,
      paymentMethod: PaymentMethod.bankCount,
      payeeContactList: [{ isDefault: IsDefault.YES, email: '', contactType: '', id: uuidv4() }],
      payeeBankAccountList: [],
      claimChequeRemarkList: [
        { claimNo: draftState.claimProcessData.claimNo, id: uuidv4(), remark: '' },
      ],
    };
    draftState.claimProcessData.payeeList = [...draftState.claimProcessData.payeeList, id];
    draftState.claimEntities.payeeListMap[id] = payeeInfoItem;
  });
  return { ...nextState };
};

export default addPayeeInfoItem;
