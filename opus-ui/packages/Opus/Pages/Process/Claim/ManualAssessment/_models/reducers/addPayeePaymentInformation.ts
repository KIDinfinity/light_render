import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

import { BENEFICIARYITEM } from '@/utils/claimConstant';

const addPayeePaymentInformation = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const id = uuidv4();
    draftState.paymentModal.datas.beneficiaryList = [
      ...(draftState.paymentModal.datas.beneficiaryList || []),
      { ...BENEFICIARYITEM, id },
    ];
  });

  return { ...nextState };
};

export default addPayeePaymentInformation;
