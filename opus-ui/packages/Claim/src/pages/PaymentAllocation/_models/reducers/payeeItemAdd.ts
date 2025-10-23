import { PAYEEINFO } from '@/utils/claimConstant';
import { IsDefault } from 'claim/enum';
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';
import { PaymentMethod } from 'claim/pages/Enum';

const addPayeeInfoItem = (state: any, actions: any) => {
  const { extraData = {} } = actions?.payload || {};
  const nextState = produce(state, (draftState: any) => {
    const id = uuidv4();

    draftState.claimData.payeeList = [
      ...(draftState.claimData.payeeList || []),
      {
        ...PAYEEINFO,
        claimNo: draftState.claimNo,
        id,
        isDefault: 'N',
        paymentMethod: PaymentMethod.bankCount,
        payeeContactList: [{ isDefault: IsDefault.YES, email: '', contactType: '', id: uuidv4() }],
        payeeBankAccountList: [],
        claimChequeRemarkList: [{ claimNo: draftState.claimNo, id: uuidv4(), remark: '' }],
        manualAdd: 'Y',
        ...extraData,
      },
    ];
    if (!draftState.activePayeeId) {
      draftState.activePayeeId = id;
    }
  });
  return { ...nextState };
};

export default addPayeeInfoItem;
